"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Input,
  SearchableSelect,
  SegmentedToggle,
} from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import StatCard from "../../../components/ui/StatCard";
import Modal from "../../../components/ui/Modal";
import {
  getCandidateProfile,
  getCandidateProfileById,
  getUserById,
  getDisnakerProfile,
} from "../../../services/profile";
import {
  getAk1Document,
  upsertAk1Document,
  verifyAk1,
  listAk1Documents,
  presignUpload,
  presignDownload,
  getAk1Layout,
  listAk1Templates,
  requestAk1Renewal,
  approveAk1Renewal,
  checkAk1Expired,
} from "../../../services/ak1";
import { getEducationGroups } from "../../../services/site";
import { useRouter } from "next/navigation";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import Card from "../../../components/ui/Card";
import CardGrid from "../../../components/ui/CardGrid";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import { useToast } from "../../../components/ui/Toast";
import type {
  Ak1Layout,
  Ak1LayoutField,
  Ak1Template,
} from "../../../services/ak1";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  candidateAk1FilesSchema,
  ak1NoUrutSchema,
} from "../../../utils/zod-schemas";
import { PDFPage, PDFFont } from "pdf-lib";

type Ak1LayoutFieldExt = Ak1LayoutField & {
  w?: number;
  h?: number;
  digitSize?: number;
  count?: number;
  cellW?: number;
  cellH?: number;
  gap?: number;
  source?: string;
};

type CandidateProfileLite = {
  full_name?: string;
  nik?: string;
  place_of_birth?: string;
  birthdate?: string;
  gender?: string;
  status_perkawinan?: string;
  address?: string;
  postal_code?: string;
  user_id?: string;
  last_education?: string;
  graduation_year?: string | number;
};

type Ak1Document = {
  status?: string;
  card_file?: string | null;
  card_created_at?: string;
  no_urut_pendaftaran?: string;
  candidate_id?: string;
  id?: string;
  keterampilan?: string[] | string;
  expired1?: string;
  expired2?: string;
  expired3?: string;
  expired4?: string;
  note?: string;
  nip_create?: string | null;
  nip_renew_1?: string | null;
  nip_renew_2?: string | null;
  nip_renew_3?: string | null;
  placed_at?: string;
} & {
  ktp_file?: string;
  ijazah_file?: string;
  pas_photo_file?: string;
  certificate_file?: string;
};

type Ak1Row = {
  full_name?: string;
  nik?: string;
  place_of_birth?: string;
  birthdate?: string;
  status?: string;
  file?: string | null;
  candidate_id: string;
  ak1_document_id?: string;
  no_pendaftaran?: string;
};

interface RenderFieldProps {
  f: Ak1LayoutFieldExt;
  candidate: CandidateProfileLite | null;
  user: Record<string, unknown> | null;
  doc: Ak1Document | Record<string, unknown> | null;
  meta: {
    card_created_at?: string;
    no_urut_pendaftaran?: string;
  };
  photoUrl: string | null;
  noReg: string;
  formatDate: (d: string | undefined | null) => string;
  educationMap: Record<string, string>;
  currentDisnaker: { nip?: string; [key: string]: unknown } | null;
}

const RenderField = ({
  f,
  candidate,
  user,
  doc,
  meta,
  photoUrl,
  noReg,
  formatDate,
  educationMap,
  currentDisnaker,
}: RenderFieldProps) => {
  const isKeterampilan =
    f.token === "ak1_doc:keterampilan" || f.token === "keterampilan";
  const kind = isKeterampilan ? "list" : f.kind || "text";

  if (kind === "list") {
    const tokenStr = String(f.token);
    const [src, key] = tokenStr.includes(":")
      ? (tokenStr.split(":", 2) as [string, string])
      : ["", tokenStr];
    const listData: unknown = (() => {
      const readFrom = (namespace: string, k: string): unknown => {
        if (namespace === "ak1_doc" || namespace === "doc") {
          return (doc as unknown as Record<string, unknown>)?.[k] ?? [];
        }
        return [];
      };
      const k = key || tokenStr;
      if (src) return readFrom(src, k);
      return readFrom("doc", k);
    })();

    let items: string[] = [];
    if (Array.isArray(listData)) {
      items = listData.map((x) => String(x || "").trim()).filter(Boolean);
    } else if (typeof listData === "string") {
      try {
        const parsed = JSON.parse(listData);
        if (Array.isArray(parsed))
          items = parsed
            .map((x: unknown) => String(x || "").trim())
            .filter(Boolean);
      } catch {
        items = String(listData)
          .split(/[\n,]/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    const fe = f as Ak1LayoutFieldExt;
    const sizePx = Math.max(1, f.size || 16);
    const baseW = Math.max(32, Number(fe.w || Math.round(sizePx * 8)));

    let startX = f.x || 0;
    let anchor: "start" | "middle" | "end" = "start";

    if (fe.align === "center") {
      startX = (f.x || 0) + baseW / 2;
      anchor = "middle";
    } else if (fe.align === "right") {
      startX = (f.x || 0) + baseW;
      anchor = "end";
    }

    return (
      <g>
        {items.map((item, idx) => (
          <text
            key={`li-${idx}`}
            x={startX}
            y={(f.y || 0) + idx * sizePx}
            dominantBaseline="hanging"
            textAnchor={anchor}
            fontFamily="Arial, sans-serif"
            fontSize={sizePx}
            fill="black"
          >
            {`• ${item}`}
          </text>
        ))}
      </g>
    );
  } else if (kind === "image") {
    const fe = f as Ak1LayoutFieldExt;
    const baseW = Math.max(16, Number(fe.w || fe.size || 120));
    const baseH = Math.max(16, Number(fe.h || Math.round(baseW * 0.625)));
    const x = f.x || 0;
    const y = f.y || 0;
    const srcToken = String(f.token || "");
    const [mSrc, mKey] = srcToken.includes(":")
      ? (srcToken.split(":", 2) as [string, string])
      : ["", srcToken];
    const pUrl = (() => {
      if (photoUrl) return photoUrl;
      if ((mSrc === "ak1_doc" || mSrc === "doc") && mKey) {
        const gdd = doc as unknown as Record<string, unknown>;
        return String((gdd && gdd[mKey]) || "");
      }
      if (srcToken === "pas_photo" || mKey === "pas_photo_file")
        return String(doc?.pas_photo_file || "");
      return "";
    })();
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect
          width={baseW}
          height={baseH}
          fill="white"
          stroke="black"
          strokeWidth={1}
        />
        {pUrl ? (
          <image
            href={pUrl}
            width={baseW}
            height={baseH}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <text
            x={baseW / 2}
            y={baseH / 2}
            dominantBaseline="central"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={14}
            fill="gray"
            fontWeight={700}
          >
            {mKey || String(f.token)}
          </text>
        )}
      </g>
    );
  } else if (kind === "text") {
    const fe = f as Ak1LayoutFieldExt;
    const tokenStr = String(f.token);
    const [src, key] = tokenStr.includes(":")
      ? (tokenStr.split(":", 2) as [string, string])
      : ["", tokenStr];
    const mappedVal = (() => {
      const alias = (k: string) => {
        const map: Record<string, string> = {
          no_hp: "no_handphone",
          phone: "no_handphone",
          telepon: "no_handphone",
          hp: "no_handphone",
        };
        return map[k] || k;
      };
      const normKey = alias(key);
      if (normKey === "gender" || key === "gender") {
        const g = String(candidate?.gender || "");
        return g === "L" ? "Laki-Laki" : g === "P" ? "Perempuan" : g;
      }
      if (normKey === "birthdate" || key === "birthdate")
        return formatDate(candidate?.birthdate);
      if (normKey === "ttl" || key === "ttl")
        return `${String(candidate?.place_of_birth || "")} / ${formatDate(candidate?.birthdate)}`;
      if (
        normKey === "nip" ||
        key === "nip" ||
        normKey === "nip_create" ||
        key === "nip_create"
      ) {
        const d = doc as Record<string, unknown>;
        return String(d?.nip_create || currentDisnaker?.nip || "");
      }
      if (normKey.startsWith("expired")) {
        let add = 24;
        if (normKey === "expired1") add = 6;
        else if (normKey === "expired2") add = 12;
        else if (normKey === "expired3") add = 18;
        else if (normKey === "expired4") add = 24;
        else {
          // Dynamic based on renewal status
          const d = doc || {};
          if (d.nip_renew_3) add = 24;
          else if (d.nip_renew_2) add = 18;
          else if (d.nip_renew_1) add = 12;
          else add = 6;
        }

        const base = meta.card_created_at
          ? new Date(meta.card_created_at)
          : new Date();
        if (Number.isNaN(base.getTime())) base.setTime(new Date().getTime());
        base.setMonth(base.getMonth() + add);
        return formatDate(base.toISOString());
      }
      if (normKey === "no_reg" || key === "no_reg") return String(noReg);
      if (normKey === "last_education" || key === "last_education") {
        const val = String(candidate?.last_education || "");
        return educationMap?.[val] || val;
      }
      if (
        normKey === "education_year_concat" ||
        key === "education_year_concat"
      ) {
        const val = String(candidate?.last_education || "");
        const eduName = educationMap?.[val] || val;
        const year = String(candidate?.graduation_year || "");
        return year ? `${eduName} TH ${year}` : eduName;
      }
      if (normKey === "ttl_comma" || key === "ttl_comma") {
        return `${String(candidate?.place_of_birth || "")}, ${formatDate(candidate?.birthdate)}`;
      }

      const readFrom = (namespace: string, k: string): string => {
        if (namespace === "candidate")
          return String(
            (candidate as unknown as Record<string, unknown>)?.[k] ?? "",
          );
        if (namespace === "user")
          return String(
            (user as unknown as Record<string, unknown>)?.[k] ?? "",
          );
        if (namespace === "ak1_doc" || namespace === "doc")
          return String((doc as unknown as Record<string, unknown>)?.[k] ?? "");
        if (namespace === "disnaker_profile")
          return String(
            (currentDisnaker as Record<string, unknown>)?.[k] ?? "",
          );
        return "";
      };
      if (src) {
        const first = readFrom(src, normKey);
        if (first) return first;
        const c = readFrom("candidate", normKey);
        if (c) return c;
        const u = readFrom("user", normKey);
        if (u) return u;
        const d = readFrom("doc", normKey);
        return d;
      }
      const c = readFrom("candidate", normKey);
      if (c) return c;
      const u = readFrom("user", normKey);
      if (u) return u;
      const d = readFrom("doc", normKey);
      return d;
    })();

    const sizePx = Math.max(1, f.size || 16);
    const baseW = Math.max(32, Number(fe.w || Math.round(sizePx * 8)));
    const baseH = Math.round(sizePx * 1.2);

    let cx = (f.x || 0) + baseW / 2;
    let anchor: "middle" | "start" | "end" = "middle";

    if (fe.align === "left") {
      cx = f.x || 0;
      anchor = "start";
    } else if (fe.align === "right") {
      cx = (f.x || 0) + baseW;
      anchor = "end";
    }

    const cy = (f.y || 0) + baseH / 2;

    return (
      <text
        x={cx}
        y={cy}
        dominantBaseline="central"
        textAnchor={anchor}
        fontSize={sizePx}
        fill="black"
      >
        {mappedVal}
      </text>
    );
  } else {
    // Cells
    const count = Math.max(1, Number(f.count || 1));
    const cellW = Math.max(1, Number(f.cellW || 24));
    const cellH = Math.max(1, Number(f.cellH || 32));
    const gap = Math.max(0, Number(f.gap !== undefined ? f.gap : 4));
    const startX = f.x || 0;
    const startY = f.y || 0;
    const srcRaw = String(
      (f as unknown as { source?: string }).source || f.token || "",
    );
    let digits: string[] = [];

    if (srcRaw === "noreg_nik4" || srcRaw === "nik_pendaftaran") {
      digits = String(candidate?.nik || "")
        .slice(0, 4)
        .padEnd(4, " ")
        .split("");
    } else if (srcRaw === "noreg_no8" || srcRaw === "no_urut_pendaftaran") {
      digits = String(meta.no_urut_pendaftaran || "")
        .padStart(8, "0")
        .slice(0, 8)
        .split("");
    } else if (srcRaw === "noreg_ttl6" || srcRaw === "birthdate_pendaftaran") {
      const bdStr = String(candidate?.birthdate || "");
      const d = new Date(bdStr);
      if (!Number.isNaN(d.getTime())) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);
        digits = `${dd}${mm}${yy}`.split("");
      }
    } else if (srcRaw === "nik") {
      digits = String(candidate?.nik || "")
        .padEnd(count, " ")
        .slice(0, count)
        .split("");
    } else {
      // Generic data resolution for box type (matching text type logic)
      const tokenStr = String(f.token || "");
      const [src, key] = tokenStr.includes(":")
        ? (tokenStr.split(":", 2) as [string, string])
        : ["", tokenStr];

      const resolveVal = () => {
        const alias = (k: string) => {
          const map: Record<string, string> = {
            no_hp: "no_handphone",
            phone: "no_handphone",
            telepon: "no_handphone",
            hp: "no_handphone",
          };
          return map[k] || k;
        };
        const normKey = alias(key);

        // Specific overrides
        if (normKey === "gender" || key === "gender") {
          const g = String(candidate?.gender || "");
          return g === "L" ? "Laki-Laki" : g === "P" ? "Perempuan" : g;
        }
        if (normKey === "birthdate" || key === "birthdate")
          return formatDate(candidate?.birthdate);
        if (normKey === "ttl" || key === "ttl")
          return `${String(candidate?.place_of_birth || "")} / ${formatDate(candidate?.birthdate)}`;
        if (
          normKey === "nip" ||
          key === "nip" ||
          normKey === "nip_create" ||
          key === "nip_create"
        ) {
          const d = doc as Record<string, unknown>;
          return String(d?.nip_create || currentDisnaker?.nip || "");
        }
        if (normKey.startsWith("expired")) {
          let add = 24;
          if (normKey === "expired1") add = 6;
          else if (normKey === "expired2") add = 12;
          else if (normKey === "expired3") add = 18;
          else if (normKey === "expired4") add = 24;
          else {
            // Dynamic based on renewal status
            const d = doc || {};
            if (d.nip_renew_3) add = 24;
            else if (d.nip_renew_2) add = 18;
            else if (d.nip_renew_1) add = 12;
            else add = 6;
          }

          let base = meta.card_created_at
            ? new Date(meta.card_created_at)
            : new Date();
          if (Number.isNaN(base.getTime())) base = new Date();
          base.setMonth(base.getMonth() + add);
          return formatDate(base.toISOString());
        }
        if (normKey === "no_reg" || key === "no_reg") return String(noReg);
        if (normKey === "last_education" || key === "last_education") {
          const val = String(candidate?.last_education || "");
          return educationMap?.[val] || val;
        }
        if (
          normKey === "education_year_concat" ||
          key === "education_year_concat"
        ) {
          const val = String(candidate?.last_education || "");
          const eduName = educationMap?.[val] || val;
          const year = String(candidate?.graduation_year || "");
          return year ? `${eduName} TH ${year}` : eduName;
        }
        if (normKey === "ttl_comma" || key === "ttl_comma") {
          return `${String(candidate?.place_of_birth || "")}, ${formatDate(candidate?.birthdate)}`;
        }

        const readFrom = (namespace: string, k: string): string => {
          if (namespace === "candidate")
            return String(
              (candidate as unknown as Record<string, unknown>)?.[k] ?? "",
            );
          if (namespace === "user")
            return String(
              (user as unknown as Record<string, unknown>)?.[k] ?? "",
            );
          if (namespace === "ak1_doc" || namespace === "doc")
            return String(
              (doc as unknown as Record<string, unknown>)?.[k] ?? "",
            );
          if (namespace === "disnaker_profile")
            return String(
              (currentDisnaker as Record<string, unknown>)?.[k] ?? "",
            );
          return "";
        };

        if (src) {
          const first = readFrom(src, normKey);
          if (first) return first;
          const c = readFrom("candidate", normKey);
          if (c) return c;
          const u = readFrom("user", normKey);
          if (u) return u;
          const d = readFrom("doc", normKey);
          return d;
        }
        const c = readFrom("candidate", normKey);
        if (c) return c;
        const u = readFrom("user", normKey);
        if (u) return u;
        const d = readFrom("doc", normKey);
        return d;
      };

      const val = resolveVal();
      // If generic resolution fails but token implies NIK, fallback to candidate.nik?
      // But the user token is candidate:nik which should resolve via generic logic.
      digits = String(val || "")
        .padEnd(count, " ")
        .slice(0, count)
        .split("");
    }

    // Implementation consistent with text type: use size or default, no cellH fallback
    // Ensure digitSize is prioritized and handle potential string values
    const rawSize = (f as Ak1LayoutFieldExt).digitSize ?? f.size;
    const val = Number(rawSize || 18);
    const sizeTxt = Math.max(1, val);

    return (
      <g>
        {Array.from({ length: count }).map((_, idx) => {
          const ch = (digits[idx] || "").trim();
          const isEmpty = ch.length === 0;
          const cx = startX + idx * (cellW + gap) + cellW / 2;
          const cy = startY + cellH / 2;

          return (
            <g key={`box-${idx}`}>
              <rect
                x={startX + idx * (cellW + gap)}
                y={startY}
                width={cellW}
                height={cellH}
                fill="white"
                stroke="black"
                strokeWidth={1}
              />
              <text
                x={cx}
                y={cy}
                dominantBaseline="central"
                textAnchor="middle"
                fontSize={sizeTxt}
                fontFamily="Arial, sans-serif"
                fill={isEmpty ? "gray" : "black"}
              >
                {isEmpty ? "•" : ch}
              </text>
            </g>
          );
        })}
      </g>
    );
  }
};

const Ak1PreviewItem = ({
  template,
  layout,
  candidate,
  user,
  doc,
  photoUrl,
  meta,
  noReg,
  formatDate,
  educationMap,
  currentDisnaker,
}: {
  template: Ak1Template;
  layout: Ak1Layout | null;
  candidate: CandidateProfileLite | null;
  user: Record<string, unknown> | null;
  doc: Ak1Document | Record<string, unknown> | null;
  photoUrl: string | null;
  meta: {
    card_created_at?: string;
    no_urut_pendaftaran?: string;
  };
  noReg: string;
  formatDate: (d: string | undefined | null) => string;
  educationMap: Record<string, string>;
  currentDisnaker: { nip?: string; [key: string]: unknown } | null;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const FRONT_BASE = {
    w: template.front_width || 841.89,
    h: template.front_height || 311.81,
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!template.file_template) {
        if (active) setBgUrl(null);
        return;
      }
      const url = String(template.file_template);
      if (url.startsWith("http") && !url.includes("X-Amz-Signature")) {
        try {
          const p = await presignDownload(url);
          if (active) setBgUrl(p.url);
        } catch {
          if (active) setBgUrl(url);
        }
      } else {
        if (active) setBgUrl(url);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [template.file_template]);

  useEffect(() => {
    const calc = () => {
      if (containerRef.current) {
        const fw = containerRef.current.clientWidth;
        const auto = fw ? fw / FRONT_BASE.w : 1;
        setScale(auto);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [FRONT_BASE.w]);

  const previewUrl = bgUrl;

  return (
    <div className="w-full mb-8 border-b pb-4 last:border-0">
      <div className="text-sm font-bold text-gray-700 mb-2">
        {template.name || "Template"}
      </div>
      <div ref={containerRef} className="w-full overflow-hidden">
        <div
          className="relative bg-white shadow-sm border mx-auto"
          style={{
            width: FRONT_BASE.w * scale,
            height: FRONT_BASE.h * scale,
          }}
        >
          <div
            className="relative origin-top-left"
            style={{
              width: FRONT_BASE.w,
              height: FRONT_BASE.h,
              transform: `scale(${scale})`,
            }}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                className="absolute inset-0 w-full h-full object-cover"
                alt="bg"
              />
            ) : (
              <div className="absolute inset-0 bg-white" />
            )}

            <svg
              width={FRONT_BASE.w}
              height={FRONT_BASE.h}
              viewBox={`0 0 ${FRONT_BASE.w} ${FRONT_BASE.h}`}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {(layout?.coordinates || []).map((f, i) => (
                <RenderField
                  key={i}
                  f={f}
                  candidate={candidate}
                  user={user}
                  doc={doc}
                  meta={meta}
                  photoUrl={photoUrl}
                  noReg={noReg}
                  formatDate={formatDate}
                  educationMap={educationMap}
                  currentDisnaker={currentDisnaker}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Ak1Page() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [profile, setProfile] = useState<CandidateProfileLite | null>(null);
  const [doc, setDoc] = useState<Ak1Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [role] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [guardReady, setGuardReady] = useState(false);

  const [rows, setRows] = useState<Ak1Row[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState<{
    candidate?: CandidateProfileLite;
    document?: Ak1Document | null;
  } | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyPayload, setVerifyPayload] = useState<{
    ak1_document_id: string;
    status: "APPROVED" | "REJECTED";
    no_urut_pendaftaran?: string;
    card_created_at?: string;
    file?: string;
    note?: string;
  }>({ ak1_document_id: "", status: "APPROVED", note: "" });
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewPreviewDoc, setRenewPreviewDoc] = useState<Ak1Document | null>(
    null,
  );
  const [genMeta, setGenMeta] = useState<{
    ak1_document_id?: string;
    candidate_id?: string;
    no_urut_pendaftaran?: string;
    card_created_at?: string;
  }>({});
  const [genCandidate, setGenCandidate] = useState<CandidateProfileLite | null>(
    null,
  );
  const [genDocDetail, setGenDocDetail] = useState<Ak1Document | null>(null);
  const [templates, setTemplates] = useState<Ak1Template[]>([]);
  const [layouts, setLayouts] = useState<Record<string, Ak1Layout>>({});
  const [genPasPhotoUrl, setGenPasPhotoUrl] = useState<string | null>(null);

  const genNoReg = useMemo(() => {
    const nik = genCandidate?.nik || "";
    const noUrut = genMeta.no_urut_pendaftaran || "";
    const bdStr = genCandidate?.birthdate || "";
    if (nik && noUrut && bdStr) {
      const bd = new Date(String(bdStr));
      if (!Number.isNaN(bd.getTime())) {
        const dd = String(bd.getDate()).padStart(2, "0");
        const mm = String(bd.getMonth() + 1).padStart(2, "0");
        const yy = String(bd.getFullYear()).slice(-2);
        const first4 = String(nik).slice(0, 4);
        const five = String(noUrut).padStart(5, "0").slice(0, 5);
        return `${first4}${five}${dd}${mm}${yy}`;
      }
    }
    return "";
  }, [genCandidate, genMeta.no_urut_pendaftaran]);
  const [genUser, setGenUser] = useState<{
    id?: string;
    email?: string;
    role?: string;
    no_handphone?: string;
  } | null>(null);
  const [currentDisnaker, setCurrentDisnaker] = useState<{
    full_name?: string;
    nip?: string;
  } | null>(null);
  const [educationMap, setEducationMap] = useState<Record<string, string>>({});

  // Submission state
  const [ak1Files, setAk1Files] = useState<{
    ktp?: File | null;
    ijazah?: File | null;
    pas_photo?: File | null;
    certificate?: File | null;
  }>({ ktp: null, ijazah: null, pas_photo: null, certificate: null });

  const [skills, setSkills] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const runExpiredCheck = async () => {
      if (typeof window === "undefined") return;
      const role = localStorage.getItem("role") || "";
      // Only run for admin/disnaker/super_admin
      if (role !== "disnaker" && role !== "super_admin") return;

      const lastCheck = localStorage.getItem("ak1_last_expired_check");
      const today = new Date().toISOString().split("T")[0];

      if (lastCheck !== today) {
        try {
          await checkAk1Expired();
          localStorage.setItem("ak1_last_expired_check", today);
        } catch (e) {
          console.error("Failed to check expired documents", e);
        }
      }
    };
    runExpiredCheck();
  }, []);

  const uploadFile = async (
    field: "ktp" | "ijazah" | "pas_photo" | "certificate",
    file: File | undefined,
  ) => {
    if (!file) {
      setAk1Files({ ...ak1Files, [field]: null });
      return;
    }
    setAk1Files({ ...ak1Files, [field]: file });
  };

  const compressImage = (file: File) =>
    new Promise<Blob>((resolve, reject) => {
      const img = document.createElement("img");
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const maxW = 800;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("ctx"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (b) => {
            URL.revokeObjectURL(url);
            if (b) resolve(b);
            else reject(new Error("blob"));
          },
          "image/jpeg",
          0.7,
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("img"));
      };
      img.src = url;
    });

  const putSigned = async (
    url: string,
    body: Blob | File,
    contentType: string,
    publicUrl?: string,
  ) => {
    const base =
      publicUrl || (url.includes("?") ? url.slice(0, url.indexOf("?")) : url);
    const attempt = async () =>
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body,
      });
    let tries = 0;
    const delays = [300, 700, 1500];
    while (tries < delays.length) {
      try {
        const resp = await attempt();
        if (resp.ok) return base;
      } catch {}
      await new Promise((r) => setTimeout(r, delays[tries]));
      tries++;
    }
    const resp = await attempt();
    return resp.ok ? base : undefined;
  };

  const handleSubmitAk1 = async () => {
    setSubmissionError("");
    setFieldErrors({});
    setSubmitting(true);
    try {
      const uid =
        localStorage.getItem("id") || localStorage.getItem("user_id") || "";

      // Zod Validation
      const payload = {
        ktp: ak1Files.ktp,
        ijazah: ak1Files.ijazah,
        pas_photo: ak1Files.pas_photo,
        certificate: ak1Files.certificate,
      };
      const result = candidateAk1FilesSchema.safeParse(payload);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setFieldErrors(newErrors);
        setSubmissionError("Mohon periksa input anda");
        setSubmitting(false);
        return;
      }

      const candidateId = profile?.user_id || uid; // Fallback, though profile should have it

      if (ak1Files.ktp && ak1Files.ijazah && ak1Files.pas_photo) {
        const prepare = async (f: File) => {
          if (f.type && f.type.startsWith("image/")) {
            const blob = await compressImage(f);
            return {
              filename: f.name.replace(/\.[^.]+$/, ".jpg"),
              contentType: "image/jpeg",
              body: blob,
            } as { filename: string; contentType: string; body: Blob };
          }
          return {
            filename: f.name,
            contentType: f.type || "application/octet-stream",
            body: f,
          } as { filename: string; contentType: string; body: Blob | File };
        };
        const put = async (folder: string, f: File) => {
          const p = await prepare(f);
          const pre = await presignUpload(folder, p.filename, p.contentType);
          return await putSigned(
            pre.url,
            p.body,
            p.contentType,
            pre.public_url,
          );
        };
        const [ktpUrl, ijazahUrl, pasUrl, certUrl] = await Promise.all([
          put(`ak1/${uid}/ktp`, ak1Files.ktp),
          put(`ak1/${uid}/ijazah`, ak1Files.ijazah),
          put(`ak1/${uid}/pasfoto`, ak1Files.pas_photo),
          ak1Files.certificate
            ? put(`ak1/${uid}/sertifikat`, ak1Files.certificate)
            : Promise.resolve(undefined),
        ]);

        if (ktpUrl && ijazahUrl && pasUrl) {
          await upsertAk1Document({
            candidate_id: candidateId,
            ktp_file: ktpUrl,
            ijazah_file: ijazahUrl,
            pas_photo_file: pasUrl,
            certificate_file: certUrl,
            keterampilan: skills,
          });
        }
      }

      showSuccess("Data AK1 berhasil disimpan");
      window.location.reload();
    } catch (e) {
      setSubmissionError(
        e instanceof Error ? e.message : "Gagal menyimpan data AK1",
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const uid =
          localStorage.getItem("id") || localStorage.getItem("user_id");
        if (uid) {
          try {
            const resp = await getDisnakerProfile(uid);
            const data = resp.data || {};
            setCurrentDisnaker(data);
          } catch {}
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await listAk1Templates();
        const list: Ak1Template[] = data?.data || [];
        setTemplates(list);

        // Fetch layouts for each template
        const layoutsMap: Record<string, Ak1Layout> = {};
        await Promise.all(
          list.map(async (t) => {
            if (t.id) {
              try {
                const lRes = await getAk1Layout(t.id);
                const lData = (lRes.data || lRes) as Ak1Layout;
                if (lData) layoutsMap[t.id] = lData;
              } catch {}
            }
          }),
        );
        setLayouts(layoutsMap);
      } catch {}
    })();
  }, []);

  type Ak1LayoutFieldExt = Ak1LayoutField & {
    w?: number;
    h?: number;
    digitSize?: number;
  };

  interface DrawFieldItem {
    kind: string;
    value: string;
    x: number;
    y: number;
    width: number;
    height: number;
    style?: { fontSize?: number; textAlign?: string };
    count?: number;
    cellW?: number;
    cellH?: number;
    gap?: number;
    digitSize?: number;
  }

  const formatDate = (val?: string | null) => {
    if (!val) return "";
    const d = new Date(String(val));
    if (Number.isNaN(d.getTime())) return String(val);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear());
    return `${dd}-${mm}-${yy}`;
  };
  const apiToUIStatusAk1 = useMemo(
    () =>
      ({
        APPROVED: "Aktif",
        GENERATE: "Menunggu Pembuatan",
        REJECTED: "Ditolak",
        PLACED: "Sudah Ditempatkan",
        EXPIRED: "Kadaluarsa",
        RENEWAL_REQUESTED: "Menunggu Perpanjangan",
      }) as Record<
        string,
        | "Aktif"
        | "Ditolak"
        | "Menunggu Pembuatan"
        | "Sudah Ditempatkan"
        | "Kadaluarsa"
        | "Menunggu Perpanjangan"
      >,
    [],
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Menunggu Pembuatan":
        return "bg-blue-100 text-blue-800";
      case "Menunggu Perpanjangan":
        return "bg-orange-100 text-orange-800";
      case "Ditolak":
      case "Kadaluarsa":
        return "bg-red-100 text-red-800";
      case "Sudah Ditempatkan":
        return "bg-violet-100 text-violet-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const generateAk1Pdf = async (docOverride?: Ak1Document | null) => {
    try {
      const role =
        typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";
      const uid =
        (typeof window !== "undefined" &&
          (localStorage.getItem("id") || localStorage.getItem("user_id"))) ||
        "";
      if (!currentDisnaker && role && role !== "candidate" && uid) {
        try {
          const dp = await getDisnakerProfile(uid);
          const dData = (dp.data || dp) as { full_name?: string; nip?: string };
          if (dData) setCurrentDisnaker(dData);
        } catch {}
      }
    } catch {}
    const pdfLib = await import("pdf-lib");
    const { PDFDocument, StandardFonts, rgb } = pdfLib;
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const toPng = async (url: string, w: number, h: number) => {
      try {
        let fetchUrl = url;
        if (url.startsWith("http")) {
          const u = new URL(url);
          // Only append cache buster if not S3 presigned url
          if (
            !u.searchParams.has("X-Amz-Credential") &&
            !u.searchParams.has("x-amz-credential")
          ) {
            u.searchParams.append("t", new Date().getTime().toString());
          }
          fetchUrl = u.toString();
        } else if (url.startsWith("blob:")) {
          return new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const scale = 4;
              const canvas = document.createElement("canvas");
              canvas.width = w * scale;
              canvas.height = h * scale;
              const ctx = canvas.getContext("2d");
              if (!ctx) {
                reject(new Error("canvas"));
                return;
              }
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = "high";
              ctx.drawImage(img, 0, 0, w * scale, h * scale);
              resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = reject;
            img.src = url;
          });
        }
        const res = await fetch(fetchUrl, { mode: "cors", cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch image");
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            // High resolution rendering (scale factor 4 for 300DPI-like quality)
            const scale = 4;
            const canvas = document.createElement("canvas");
            canvas.width = w * scale;
            canvas.height = h * scale;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              URL.revokeObjectURL(objectUrl);
              reject(new Error("canvas"));
              return;
            }
            // Use high quality smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, w * scale, h * scale);
            URL.revokeObjectURL(objectUrl);
            resolve(canvas.toDataURL("image/png"));
          };
          img.onerror = (e) => {
            URL.revokeObjectURL(objectUrl);
            reject(e);
          };
          img.src = objectUrl;
        });
      } catch {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const scale = 4;
            const canvas = document.createElement("canvas");
            canvas.width = w * scale;
            canvas.height = h * scale;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("canvas"));
              return;
            }
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, w * scale, h * scale);
            resolve(canvas.toDataURL("image/png"));
          };
          img.onerror = reject;
          img.src = url;
        });
      }
    };

    const cropImageToRatio = async (
      url: string,
      targetW: number,
      targetH: number,
    ): Promise<Uint8Array> => {
      // Helper to process image once loaded
      const processImage = (
        img: HTMLImageElement,
        resolve: (val: Uint8Array) => void,
        reject: (err: unknown) => void,
      ) => {
        try {
          const scale = 3;
          const finalW = targetW * scale;
          const finalH = targetH * scale;
          const iw = img.width;
          const ih = img.height;
          const ir = iw / ih;
          const tr = targetW / targetH;
          let sw = iw,
            sh = ih,
            sx = 0,
            sy = 0;
          if (ir > tr) {
            sw = ih * tr;
            sx = (iw - sw) / 2;
          } else {
            sh = iw / tr;
            sy = (ih - sh) / 2;
          }
          const canvas = document.createElement("canvas");
          canvas.width = finalW;
          canvas.height = finalH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("canvas"));
            return;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, finalW, finalH);
          canvas.toBlob((blob) => {
            if (blob)
              blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
            else reject(new Error("blob"));
          }, "image/png");
        } catch (err) {
          reject(err);
        }
      };

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => processImage(img, resolve, reject);

        img.onerror = async () => {
          try {
            // Use our own backend proxy to bypass CORS
            const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
            const res = await fetch(proxyUrl);

            if (!res.ok) {
              throw new Error(
                `Proxy fetch failed with status: ${res.status} for url: ${url}`,
              );
            }

            const blob = await res.blob();
            const objUrl = URL.createObjectURL(blob);

            const img2 = new Image();
            img2.onload = () => {
              processImage(img2, resolve, reject);
              URL.revokeObjectURL(objUrl);
            };
            img2.onerror = (e2) => {
              URL.revokeObjectURL(objUrl);
              console.error("Proxy image load failed:", e2);
              // Final fallback: empty image
              console.error(
                "Image load failed completely. Using empty image.",
                url,
              );
              const empty = new Uint8Array([
                137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0,
                0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0,
                10, 73, 68, 65, 84, 120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10,
                45, 180, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
              ]);
              resolve(empty);
            };
            img2.src = objUrl;
          } catch (err) {
            console.error("Proxy fallback error:", err);
            // Final fallback: empty image
            const empty = new Uint8Array([
              137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0,
              0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 10,
              73, 68, 65, 84, 120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45,
              180, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
            ]);
            resolve(empty);
          }
        };
        img.src = url;
      });
    };

    const getTokenText = (token: string): string => {
      const [src, key] = token.includes(":")
        ? (token.split(":", 2) as [string, string])
        : ["", token];
      const alias = (k: string) => {
        const map: Record<string, string> = {
          no_hp: "no_handphone",
          phone: "no_handphone",
          telepon: "no_handphone",
          hp: "no_handphone",
        };
        return map[k] || k;
      };
      const normKey = alias(key);
      if (normKey === "gender" || key === "gender") {
        const g = String(genCandidate?.gender || "");
        return g === "L" ? "Laki-Laki" : g === "P" ? "Perempuan" : g;
      }
      if (normKey === "birthdate" || key === "birthdate")
        return formatDate(genCandidate?.birthdate);
      if (key === "ttl" || token === "ttl")
        return `${String(genCandidate?.place_of_birth || "")} / ${formatDate(genCandidate?.birthdate)}`;

      if (
        normKey === "nip" ||
        key === "nip" ||
        normKey === "nip_create" ||
        key === "nip_create"
      ) {
        const d = docOverride || genDocDetail || {};
        return String(
          (d as Record<string, unknown>).nip_create ||
            currentDisnaker?.nip ||
            "",
        );
      }

      if (
        key === "disnaker_full_name" ||
        key === "petugas" ||
        key === "petugas_nama"
      ) {
        return String(currentDisnaker?.full_name || "");
      }

      if (key.startsWith("expired")) {
        let add = 24;
        if (key === "expired1") add = 6;
        else if (key === "expired2") add = 12;
        else if (key === "expired3") add = 18;
        else if (key === "expired4") add = 24;
        else {
          // Dynamic based on renewal status
          const d = docOverride || genDocDetail || {};
          if (d.nip_renew_3) add = 24;
          else if (d.nip_renew_2) add = 18;
          else if (d.nip_renew_1) add = 12;
          else add = 6;
        }

        const base = genMeta.card_created_at
          ? new Date(genMeta.card_created_at)
          : new Date();
        if (Number.isNaN(base.getTime())) base.setTime(Date.now());
        base.setMonth(base.getMonth() + add);
        return formatDate(base.toISOString());
      }

      if (key === "no_reg" || token === "no_reg") return String(genNoReg);

      if (normKey === "last_education" || key === "last_education") {
        const val = String(genCandidate?.last_education || "");
        return educationMap?.[val] || val;
      }
      if (
        normKey === "education_year_concat" ||
        key === "education_year_concat"
      ) {
        const val = String(genCandidate?.last_education || "");
        const eduName = educationMap?.[val] || val;
        const year = String(
          (genCandidate as Record<string, unknown>)?.graduation_year || "",
        );
        return year ? `${eduName} TH ${year}` : eduName;
      }
      if (normKey === "ttl_comma" || key === "ttl_comma") {
        return `${String(genCandidate?.place_of_birth || "")}, ${formatDate(genCandidate?.birthdate)}`;
      }

      const readFrom = (ns: string, k: string): string => {
        if (ns === "candidate")
          return String((genCandidate as Record<string, unknown>)?.[k] ?? "");
        if (ns === "user")
          return String((genUser as Record<string, unknown>)?.[k] ?? "");
        if (ns === "disnaker_profile")
          return String(
            (currentDisnaker as Record<string, unknown>)?.[k] ?? "",
          );
        if (ns === "ak1_doc" || ns === "doc")
          return String(
            ((docOverride || genDocDetail) as Record<string, unknown>)?.[k] ??
              "",
          );
        return "";
      };

      if (src) {
        const first = readFrom(src, normKey);
        if (first) return first;
      }
      return (
        readFrom("candidate", normKey) ||
        readFrom("user", normKey) ||
        readFrom("doc", normKey)
      );
    };

    let photoBlobUrl: string | null = null;
    try {
      const photoUrl =
        genPasPhotoUrl ||
        String((docOverride || genDocDetail)?.pas_photo_file || "");
      if (photoUrl) {
        let pUrl = photoUrl;
        try {
          if (pUrl.startsWith("http")) {
            const pre = await presignDownload(pUrl);
            // Use presigned URL first
            pUrl = pre.url;
          }
          const cropped = await cropImageToRatio(pUrl, 300, 400);
          photoBlobUrl = URL.createObjectURL(
            new Blob([cropped as BlobPart], { type: "image/png" }),
          );
        } catch (e) {
          console.error("Error preparing photo for PDF:", e);
        }
      }
    } catch {}

    const getCellDigits = (item: DrawFieldItem): string[] => {
      const srcRaw = item.value || "";
      const count = Math.max(1, Number(item.count || 1));

      const [, key] = srcRaw.includes(":")
        ? srcRaw.split(":", 2)
        : ["", srcRaw];

      if (key === "noreg_nik4" || key === "nik_pendaftaran") {
        return String(genCandidate?.nik || "")
          .slice(0, 4)
          .padEnd(4, " ")
          .split("");
      }
      if (key === "noreg_no8" || key === "no_urut_pendaftaran") {
        return String(genMeta.no_urut_pendaftaran || "")
          .padStart(8, "0")
          .slice(0, 8)
          .split("");
      }
      if (key === "noreg_ttl6" || key === "birthdate_pendaftaran") {
        const bdStr = String(genCandidate?.birthdate || "");
        const d = new Date(bdStr);
        if (!Number.isNaN(d.getTime())) {
          const dd = String(d.getDate()).padStart(2, "0");
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const yy = String(d.getFullYear()).slice(-2);
          return `${dd}${mm}${yy}`.split("");
        }
        return Array(6).fill(" ");
      }
      if (key === "nik") {
        return String(genCandidate?.nik || "")
          .padEnd(count, " ")
          .slice(0, count)
          .split("");
      }

      // Handle standard birthdate token for box/cell type to avoid "-" chars
      if (key === "birthdate" || key === "tgl_lahir") {
        const bdStr = String(genCandidate?.birthdate || "");
        const d = new Date(bdStr);
        if (!Number.isNaN(d.getTime())) {
          const dd = String(d.getDate()).padStart(2, "0");
          const mm = String(d.getMonth() + 1).padStart(2, "0");

          // If count is 6, use YY. If 8, use YYYY.
          let yPart = String(d.getFullYear());
          if (count <= 6) {
            yPart = yPart.slice(-2);
          }

          return `${dd}${mm}${yPart}`.split("").slice(0, count);
        }
      }

      const val = getTokenText(srcRaw);
      return String(val || "")
        .padEnd(count, " ")
        .slice(0, count)
        .split("");
    };

    const getTokenRaw = (token: string): unknown => {
      const [src, key] = token.includes(":")
        ? (token.split(":", 2) as [string, string])
        : ["", token];
      const readFrom = (ns: string, k: string): unknown => {
        let obj: Record<string, unknown> | null = null;
        if (ns === "candidate") {
          obj = (genCandidate as unknown as Record<string, unknown>) || null;
        } else if (ns === "user") {
          obj = (genUser as Record<string, unknown> | null) || null;
        } else if (ns === "disnaker_profile") {
          obj = (currentDisnaker as Record<string, unknown> | null) || null;
        } else if (ns === "ak1_doc" || ns === "doc") {
          obj =
            ((docOverride || genDocDetail) as Record<string, unknown> | null) ||
            null;
        }
        return obj ? obj[k] : undefined;
      };
      if (src) {
        const v = readFrom(src, key);
        if (v !== undefined && v !== null) return v;
      }
      return (
        readFrom("candidate", key) ??
        readFrom("user", key) ??
        readFrom("doc", key)
      );
    };

    const drawFields = async (
      page: PDFPage,
      items: DrawFieldItem[],
      pgW: number,
      pgH: number,
      font: PDFFont,
    ) => {
      for (const item of items) {
        if (item.kind === "image") {
          if (
            (item.value === "pas_photo" || item.value?.includes("pas_photo")) &&
            photoBlobUrl
          ) {
            const x = item.x;
            const y = pgH - item.y;
            const w = item.width;
            const h = item.height;
            const png = await toPng(photoBlobUrl, w * 3, h * 3);
            const emb = await pdfDoc.embedPng(png);
            page.drawImage(emb, {
              x,
              y: y - h,
              width: w,
              height: h,
            });
          }
        } else if (item.kind === "list") {
          const rawVal = getTokenRaw(item.value);
          let lines: string[] = [];
          if (Array.isArray(rawVal)) {
            lines = (rawVal as unknown[])
              .map((x) => String(x || "").trim())
              .filter(Boolean);
          } else if (typeof rawVal === "string") {
            try {
              const parsed = JSON.parse(rawVal);
              if (Array.isArray(parsed)) {
                lines = parsed
                  .map((x: unknown) => String(x || "").trim())
                  .filter(Boolean);
              } else {
                lines = String(rawVal)
                  .split(/[\n,]/)
                  .map((s) => s.trim())
                  .filter(Boolean);
              }
            } catch {
              lines = String(rawVal)
                .split(/[\n,]/)
                .map((s) => s.trim())
                .filter(Boolean);
            }
          }

          const fSize = item.style?.fontSize || 10;
          const sizePx = Math.max(1, fSize);
          const align = item.style?.textAlign || "left";
          const hasWidth = Number(item.width || 0) > 0;

          lines.forEach((l, idx) => {
            const content = `• ${l}`;
            const w = font.widthOfTextAtSize(content, fSize);

            let finalX: number;
            if (hasWidth) {
              const baseW = Math.max(
                32,
                Number(item.width || Math.round(sizePx * 8)),
              );
              let cx = item.x;
              if (align === "center") cx = item.x + baseW / 2;
              else if (align === "right") cx = item.x + baseW;
              finalX =
                align === "center"
                  ? cx - w / 2
                  : align === "right"
                    ? cx - w
                    : cx;
            } else {
              // Anchor-based alignment when width is not set
              if (align === "center") finalX = item.x - w / 2;
              else if (align === "right") finalX = item.x - w;
              else finalX = item.x;
            }

            const y = pgH - (item.y + idx * sizePx) - sizePx * 0.8;

            page.drawText(content, {
              x: finalX,
              y,
              size: fSize,
              font,
              color: rgb(0, 0, 0),
            });
          });
        } else if (item.kind === "text") {
          const txt = getTokenText(item.value);
          const fSize = item.style?.fontSize || 10;
          const align = item.style?.textAlign || "left";

          const sizePx = Math.max(1, fSize);
          const w = font.widthOfTextAtSize(txt, fSize);
          const baseH = Math.round(sizePx * 1.2);
          const hasWidth = Number(item.width || 0) > 0;
          let finalX: number;
          if (hasWidth) {
            const baseW = Math.max(
              32,
              Number(item.width || Math.round(sizePx * 8)),
            );
            let cx = item.x + baseW / 2;
            if (align === "left") cx = item.x;
            else if (align === "right") cx = item.x + baseW;
            finalX =
              align === "left" ? cx : align === "right" ? cx - w : cx - w / 2;
          } else {
            // Anchor-based alignment: treat x as anchor
            finalX =
              align === "left"
                ? item.x
                : align === "right"
                  ? item.x - w
                  : item.x - w / 2;
          }

          const cy = item.y + baseH / 2;
          const pdfY = pgH - cy - fSize / 3;

          page.drawText(txt, {
            x: finalX,
            y: pdfY,
            size: fSize,
            font,
            color: rgb(0, 0, 0),
          });
        } else {
          // Cells / Box
          const digits = getCellDigits(item);
          const cellW = Math.max(1, Number(item.cellW || 24));
          const cellH = Math.max(1, Number(item.cellH || 32));
          const gap = Math.max(
            0,
            Number(item.gap !== undefined ? item.gap : 4),
          );
          const startX = item.x;
          const startY = item.y;
          const fSize = Number(item.digitSize || item.style?.fontSize || 18);

          digits.forEach((ch, idx) => {
            const cx = startX + idx * (cellW + gap) + cellW / 2;
            const cy = startY + cellH / 2;

            // Draw box border
            const boxX = startX + idx * (cellW + gap);
            const boxY = pgH - startY - cellH; // pdf-lib uses bottom-left origin

            page.drawRectangle({
              x: boxX,
              y: boxY,
              width: cellW,
              height: cellH,
              borderColor: rgb(0, 0, 0),
              borderWidth: 1,
            });

            const pdfY = pgH - cy - fSize / 3;
            const w = font.widthOfTextAtSize(ch, fSize);

            page.drawText(ch, {
              x: cx - w / 2,
              y: pdfY,
              size: fSize,
              font,
              color: rgb(0, 0, 0),
            });
          });
        }
      }
    };

    for (const t of templates) {
      if (!t.id) continue;
      const layout = layouts[t.id];
      if (!layout) continue;

      // Front Page (using file_template)
      const bgUrlRaw = t.file_template;
      if (bgUrlRaw) {
        let bgUrl = bgUrlRaw;
        if (bgUrl.startsWith("http")) {
          const p = await presignDownload(bgUrl);
          bgUrl = p.url;
        }

        // 29.7cm x 11cm in points (1 cm = 28.3465 pt)
        const CM_TO_PT = 28.3465;
        const targetW = 29.7 * CM_TO_PT; // ~841.89
        const targetH = 11 * CM_TO_PT; // ~311.81

        // Determine layout dimensions (default to target if not set)
        const layoutW = t.front_width || targetW;
        const layoutH = t.front_height || targetH;

        // Calculate scale factors to map layout coordinates to target page size
        const scaleX = targetW / layoutW;
        const scaleY = targetH / layoutH;

        const bgPng = await toPng(bgUrl, targetW, targetH);
        const bgImg = await pdfDoc.embedPng(bgPng);
        const page = pdfDoc.addPage([targetW, targetH]);
        page.drawImage(bgImg, {
          x: 0,
          y: 0,
          width: targetW,
          height: targetH,
        });

        const mapItem = (f: Ak1LayoutFieldExt): DrawFieldItem => {
          const isKeterampilan =
            f.token === "ak1_doc:keterampilan" || f.token === "keterampilan";
          const kind = isKeterampilan ? "list" : f.kind || "text";

          // Scale coordinates and dimensions
          const x = (f.x || 0) * scaleX;
          const y = (f.y || 0) * scaleY;
          const width = (f.w || 0) * scaleX;
          const height = (f.h || 0) * scaleY;
          const fontSize = (f.size || 10) * scaleX;
          const cellW = (f.cellW || 0) * scaleX;
          const cellH = (f.cellH || 0) * scaleY;
          const gap = (f.gap || 0) * scaleX;
          const digitSize = (f.digitSize || fontSize) * scaleY;

          return {
            kind,
            value: f.token,
            x,
            y,
            width,
            height,
            style: { fontSize, textAlign: f.align || "left" },
            count: f.count,
            cellW,
            cellH,
            gap,
            digitSize,
          };
        };

        const frontItems = (layout.coordinates || []).filter(
          (x) => !x.side || x.side === "front",
        );
        const mappedFront = frontItems.map(mapItem);
        await drawFields(
          page,
          mappedFront,
          page.getWidth(),
          page.getHeight(),
          font,
        );
      }

      // Back Page
      const backItems = (layout.coordinates || []).filter(
        (x) => x.side === "back",
      );
      if (backItems.length > 0) {
        // 29.7cm x 11cm in points (1 cm = 28.3465 pt)
        const CM_TO_PT = 28.3465;
        const targetW = 29.7 * CM_TO_PT;
        const targetH = 11 * CM_TO_PT;

        const layoutW = t.front_width || targetW;
        const layoutH = t.front_height || targetH;

        const scaleX = targetW / layoutW;
        const scaleY = targetH / layoutH;

        const page = pdfDoc.addPage([targetW, targetH]);

        const mapItem = (f: Ak1LayoutFieldExt): DrawFieldItem => {
          const isKeterampilan =
            f.token === "ak1_doc:keterampilan" || f.token === "keterampilan";
          const kind = isKeterampilan ? "list" : f.kind || "text";

          const x = (f.x || 0) * scaleX;
          const y = (f.y || 0) * scaleY;
          const width = (f.w || 0) * scaleX;
          const height = (f.h || 0) * scaleY;
          const fontSize = (f.size || 10) * scaleX;
          const cellW = (f.cellW || 0) * scaleX;
          const cellH = (f.cellH || 0) * scaleY;
          const gap = (f.gap || 0) * scaleX;
          const digitSize = (f.digitSize || fontSize) * scaleY;

          return {
            kind,
            value: f.token,
            x,
            y,
            width,
            height,
            style: { fontSize, textAlign: f.align || "left" },
            count: f.count,
            cellW,
            cellH,
            gap,
            digitSize,
          };
        };

        const mappedBack = backItems.map(mapItem);
        await drawFields(
          page,
          mappedBack,
          page.getWidth(),
          page.getHeight(),
          font,
        );
      }
    }

    if (photoBlobUrl) URL.revokeObjectURL(photoBlobUrl);
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
  };

  const filteredAk1 = useMemo(() => {
    const base = rows.map((r) => ({
      ...r,
      uiStatus:
        apiToUIStatusAk1[String(r.status || "").toUpperCase()] ||
        "Menunggu Pembuatan",
    }));
    const bySearch = base.filter((r) => {
      const nama = String(r.full_name || "");
      const nik = String(r.nik || "");
      const term = searchTerm.toLowerCase();
      return (
        nama.toLowerCase().includes(term) || nik.toLowerCase().includes(term)
      );
    });
    const byStatus = bySearch.filter(
      (r) => statusFilter === "all" || r.uiStatus === statusFilter,
    );
    return byStatus;
  }, [rows, searchTerm, statusFilter, apiToUIStatusAk1]);
  const paginatedAk1 = useMemo(
    () => filteredAk1.slice((page - 1) * pageSize, page * pageSize),
    [filteredAk1, page, pageSize],
  );

  useEffect(() => {
    async function bootPerms() {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === role.toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          setPermissions(rows.map((r) => r.code));
        }
      } catch {}
      setPermsLoaded(true);
    }
    if (role) bootPerms();
  }, [role]);

  useEffect(() => {
    async function boot() {
      try {
        if (!permsLoaded) return;
        const allowed = permissions.includes("ak1.read");
        if (!allowed) {
          router.replace("/dashboard");
          return;
        }
        setGuardReady(true);
        const uid =
          typeof window !== "undefined"
            ? localStorage.getItem("id") ||
              localStorage.getItem("user_id") ||
              ""
            : "";

        // Fetch education groups
        try {
          const eduResp = await getEducationGroups();
          const eduGroups = (eduResp.data || eduResp) as Array<{
            id: string | number;
            name: string;
            items?: Array<{ id: string | number; name: string }>;
          }>;
          const map: Record<string, string> = {};
          eduGroups.forEach((g) => {
            if (Array.isArray(g.items)) {
              g.items.forEach((i) => {
                map[String(i.id)] = i.name;
              });
            }
          });
          setEducationMap(map);
        } catch {}

        // Fetch current Disnaker profile if not candidate
        if (role !== "candidate" && uid) {
          try {
            const dp = await getDisnakerProfile(uid);
            const dData = (dp.data || dp) as {
              full_name?: string;
              nip?: string;
            };
            if (dData) setCurrentDisnaker(dData);
          } catch {}
        }

        if (role === "candidate") {
          const prof = await getCandidateProfile(uid);
          setProfile(prof.data || prof);
          let docData: Ak1Document | null = null;
          try {
            const byAuth = await getAk1Document();
            docData = (byAuth as { data?: Ak1Document | null }).data || null;
          } catch {}
          if (!docData) {
            const first = await getAk1Document(uid);
            docData = (first as { data?: Ak1Document | null }).data || null;
          }
          if (!docData) {
            try {
              const env = (prof.data || prof) as Record<string, unknown>;
              const candIdRaw =
                (env?.candidate_id as unknown) || (env?.id as unknown);
              const candId =
                typeof candIdRaw === "string"
                  ? candIdRaw
                  : String(candIdRaw || "");
              if (candId) {
                const second = await getAk1Document(undefined, candId);
                docData =
                  (second as { data?: Ak1Document | null }).data || null;
              }
            } catch {}
          }
          if (!docData) {
            try {
              const list = await listAk1Documents();
              const items = (list?.data || []) as Array<{
                id: string;
                candidate_id: string;
                nik?: string;
                full_name?: string;
                status?: string;
                file?: string | null;
              }>;
              const p = (prof.data || prof) as CandidateProfileLite;
              const match = items.find(
                (x) =>
                  (p.nik && x.nik && String(p.nik) === String(x.nik)) ||
                  (p.full_name &&
                    x.full_name &&
                    String(p.full_name) === String(x.full_name)),
              );
              if (match) {
                const byCand = await getAk1Document(
                  undefined,
                  match.candidate_id,
                );
                docData =
                  (byCand as { data?: Ak1Document | null }).data || null;
              }
            } catch {}
          }
          setDoc(docData);
          const status = (() => {
            const s = (docData || {})?.status;
            if (s) return String(s).toUpperCase();
            if (docData) return "GENERATE";
            return undefined;
          })();
          const hasDoc = Boolean(docData);
          setRows(
            hasDoc
              ? [
                  {
                    full_name: (prof.data || prof)?.full_name,
                    nik: (prof.data || prof)?.nik,
                    place_of_birth: (prof.data || prof)?.place_of_birth,
                    birthdate: (prof.data || prof)?.birthdate,
                    status,
                    file: (docData || {})?.card_file || null,
                    candidate_id: (docData || {})?.candidate_id || "",
                    ak1_document_id: (docData || {})?.id || "",
                  },
                ]
              : [],
          );
        } else {
          const list = await listAk1Documents();
          const items = (list?.data || []) as Array<{
            id: string;
            candidate_id: string;
            full_name?: string;
            nik?: string;
            place_of_birth?: string;
            birthdate?: string;
            status?: string;
            file?: string | null;
            no_pendaftaran?: string;
          }>;
          const baseRows: Ak1Row[] = items.map((d) => ({
            full_name: d.full_name,
            nik: d.nik,
            place_of_birth: d.place_of_birth,
            birthdate: d.birthdate,
            status: d.status,
            file: d.file || null,
            candidate_id: d.candidate_id,
            ak1_document_id: d.id,
            no_pendaftaran: d.no_pendaftaran,
          }));
          try {
            const ids = Array.from(
              new Set(baseRows.map((r) => r.candidate_id)),
            ).filter(Boolean);
            const candMap: Record<string, CandidateProfileLite> = {};
            await Promise.all(
              ids.map(async (id) => {
                try {
                  const prof = await getCandidateProfileById(String(id));
                  const cand =
                    (prof as { data?: CandidateProfileLite | null }).data ||
                    null;
                  if (cand) candMap[String(id)] = cand;
                } catch {}
              }),
            );
            const enriched = baseRows.map((r) => ({
              ...r,
              full_name:
                r.full_name || candMap[String(r.candidate_id)]?.full_name,
              nik: r.nik || candMap[String(r.candidate_id)]?.nik,
              place_of_birth:
                r.place_of_birth ||
                candMap[String(r.candidate_id)]?.place_of_birth,
              birthdate:
                r.birthdate || candMap[String(r.candidate_id)]?.birthdate,
            }));
            setRows(enriched);
          } catch {
            setRows(baseRows);
          }
        }
      } catch {}
      setLoading(false);
    }
    boot();
  }, [permsLoaded, permissions, router, role]);

  const requiredComplete = (() => {
    const p = profile || {};
    return Boolean(
      p.full_name &&
      p.nik &&
      p.place_of_birth &&
      p.birthdate &&
      p.gender &&
      p.status_perkawinan &&
      p.address &&
      p.postal_code,
    );
  })();

  if (loading || !guardReady) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                Kartu Kuning (AK1)
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola pengajuan AK1 dan verifikasi
              </p>
            </div>
          </div>

          {!loading &&
            role === "candidate" &&
            !requiredComplete &&
            permissions.includes("ak1.submit") &&
            (!doc || !doc.status) && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-alert-line mt-0.5"></i>
                  <div>
                    <p className="font-semibold">Profil belum lengkap</p>
                    <p className="text-sm">
                      Lengkapi nama lengkap, NIK, tempat/tanggal lahir, jenis
                      kelamin, status perkawinan, alamat, dan kode pos di
                      halaman Profil.
                    </p>
                    <a
                      href="/dashboard/profile"
                      className="inline-block mt-2 px-3 py-2 bg-primary text-white rounded-lg"
                    >
                      Ke Halaman Profil
                    </a>
                  </div>
                </div>
              </div>
            )}

          {!loading &&
            role === "candidate" &&
            (!doc || !doc.status || (doc && doc.status === "EXPIRED")) &&
            requiredComplete && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                {doc && doc.status === "EXPIRED" && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg mb-6">
                    Kartu AK1 Anda sudah expired silahkan buat baru
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600 text-xl font-bold">#</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Pengajuan Kartu AK1
                  </h2>
                </div>

                <div className="space-y-4" key="ak1-new">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Untuk pembuatan kartu AK1 baru, silakan lengkapi dokumen
                      persyaratan di bawah ini.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Scan KTP (JPG/PNG)"
                      type="file"
                      accept="image/*"
                      error={fieldErrors["ktp"]}
                      onChange={(e) =>
                        uploadFile(
                          "ktp",
                          (e.target as HTMLInputElement).files?.[0],
                        )
                      }
                    />
                    <Input
                      label="Ijazah Terakhir (PDF)"
                      type="file"
                      accept=".pdf"
                      error={fieldErrors["ijazah"]}
                      onChange={(e) =>
                        uploadFile(
                          "ijazah",
                          (e.target as HTMLInputElement).files?.[0],
                        )
                      }
                    />
                    <Input
                      label="Pas Foto (3x4)"
                      type="file"
                      accept="image/*"
                      hint="Format gambar (JPG/PNG)"
                      error={fieldErrors["pas_photo"]}
                      onChange={(e) =>
                        uploadFile(
                          "pas_photo",
                          (e.target as HTMLInputElement).files?.[0],
                        )
                      }
                    />
                    <Input
                      label="Sertifikat Kompetensi (PDF - Opsional)"
                      type="file"
                      accept=".pdf"
                      error={fieldErrors["certificate"]}
                      onChange={(e) =>
                        uploadFile(
                          "certificate",
                          (e.target as HTMLInputElement).files?.[0],
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keterampilan / Skill
                    </label>
                    <Input
                      placeholder="Ketik keahlian lalu tekan Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val && !skills.includes(val)) {
                            setSkills([...skills, val]);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() =>
                              setSkills(skills.filter((x) => x !== s))
                            }
                            className="hover:text-blue-900 ml-1"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {submissionError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                    {submissionError}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSubmitAk1}
                    disabled={submitting}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                  >
                    {submitting ? "Menyimpan..." : "Simpan Pengajuan"}
                  </button>
                </div>
              </div>
            )}

          {role === "candidate" &&
            !!doc &&
            !!doc.status &&
            doc.status !== "EXPIRED" && (
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                {(() => {
                  // Calculate expiration
                  const d = doc;
                  const statusRaw = String(
                    d.status || "GENERATE",
                  ).toUpperCase();
                  const uiStatus =
                    apiToUIStatusAk1[statusRaw] || "Menunggu Pembuatan";
                  const statusColor = getStatusColor(uiStatus);

                  const currentExpiryDate = (() => {
                    if (!d.nip_renew_1)
                      return d.expired1 ? new Date(d.expired1) : null;
                    if (!d.nip_renew_2)
                      return d.expired2 ? new Date(d.expired2) : null;
                    if (!d.nip_renew_3)
                      return d.expired3 ? new Date(d.expired3) : null;
                    return d.expired4 ? new Date(d.expired4) : null;
                  })();

                  let daysLeft: number | null = null;
                  if (
                    currentExpiryDate &&
                    !Number.isNaN(currentExpiryDate.getTime())
                  ) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    currentExpiryDate.setHours(0, 0, 0, 0);
                    const diffTime =
                      currentExpiryDate.getTime() - today.getTime();
                    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  }

                  // Logic renewal
                  const canRenew =
                    statusRaw === "APPROVED" &&
                    daysLeft !== null &&
                    daysLeft <= 7 && // Muncul seminggu sebelum expired
                    daysLeft >= 0 && // Belum expired
                    !d.nip_renew_3; // Belum mencapai batas maksimal perpanjangan

                  return (
                    <>
                      <Card>
                        <div className="flex flex-col gap-4">
                          <div className="border-b pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  Status Dokumen
                                </h3>
                                <div
                                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                                >
                                  {uiStatus}
                                </div>
                              </div>
                              {canRenew && (
                                <button
                                  onClick={async () => {
                                    if (
                                      confirm(
                                        "Apakah Anda yakin ingin memperpanjang kartu AK1?",
                                      )
                                    ) {
                                      try {
                                        await requestAk1Renewal(
                                          d.candidate_id || "",
                                        );
                                        showSuccess(
                                          "Permintaan perpanjangan berhasil dikirim",
                                        );
                                        window.location.reload();
                                      } catch {
                                        showError("Gagal memperpanjang kartu");
                                      }
                                    }
                                  }}
                                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                  Perpanjang Kartu
                                </button>
                              )}
                            </div>

                            {statusRaw === "GENERATE" && (
                              <p className="text-sm text-gray-600 mt-2">
                                Permintaan pembuatan Kartu AK1 Anda sedang
                                menunggu persetujuan.
                              </p>
                            )}
                            {statusRaw === "RENEWAL_REQUESTED" && (
                              <p className="text-sm text-gray-600 mt-2">
                                Permintaan perpanjangan kartu sedang diproses
                                oleh petugas.
                              </p>
                            )}
                            {statusRaw === "REJECTED" && (
                              <div className="mt-3 p-3 bg-red-50 text-red-800 rounded-lg text-sm border border-red-200">
                                <p className="font-semibold mb-1">
                                  Pengajuan Ditolak
                                </p>
                                <p>
                                  {d.note ||
                                    "Mohon perbaiki data Anda dan ajukan kembali."}
                                </p>
                              </div>
                            )}
                          </div>

                          {currentExpiryDate && (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Masa Berlaku
                              </h3>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-gray-600">
                                  Berlaku sampai:
                                </span>
                                <span className="font-medium">
                                  {currentExpiryDate.toLocaleDateString(
                                    "id-ID",
                                    {
                                      dateStyle: "long",
                                    },
                                  )}
                                </span>
                              </div>

                              <div
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                                  daysLeft !== null && daysLeft < 0
                                    ? "bg-red-100 text-red-800"
                                    : daysLeft !== null && daysLeft < 60
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                <i className="ri-time-line"></i>
                                {daysLeft !== null && daysLeft < 0
                                  ? `Kadaluarsa ${Math.abs(daysLeft)} hari`
                                  : `${daysLeft} hari lagi`}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>

                      {d.card_file && (
                        <Card>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Kartu AK1 Digital
                          </h3>
                          <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded shadow-sm border border-gray-100">
                                <i className="ri-file-pdf-line text-red-500 text-2xl"></i>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Kartu AK1.pdf
                                </p>
                                <p className="text-xs text-gray-500">
                                  Dokumen Digital
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={async () => {
                                const signed = await presignDownload(
                                  d.card_file!,
                                );
                                window.open(signed.url, "_blank");
                              }}
                              className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                            >
                              Unduh
                            </button>
                          </div>
                        </Card>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

          {role !== "candidate" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  title="Total Pengajuan"
                  value={filteredAk1.length}
                  change=""
                  color="var(--color-secondary)"
                  icon="ri-id-card-line"
                />
                <StatCard
                  title="Aktif"
                  value={
                    filteredAk1.filter((r) => r.uiStatus === "Aktif").length
                  }
                  change=""
                  color="var(--color-primary)"
                  icon="ri-checkbox-circle-line"
                />
                <StatCard
                  title="Menunggu"
                  value={
                    filteredAk1.filter(
                      (r) => r.uiStatus === "Menunggu Pembuatan",
                    ).length
                  }
                  change=""
                  color="var(--color-foreground)"
                  icon="ri-time-line"
                />
                <StatCard
                  title="Ditolak"
                  value={
                    filteredAk1.filter((r) => r.uiStatus === "Ditolak").length
                  }
                  change=""
                  color="var(--color-primary)"
                  icon="ri-close-circle-line"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      icon="ri-search-line"
                      type="text"
                      placeholder="Cari nama atau NIK..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-3"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                    <SearchableSelect
                      value={statusFilter}
                      onChange={(v) => setStatusFilter(v)}
                      options={[
                        { value: "all", label: "Semua Status" },
                        { value: "Aktif", label: "Aktif" },
                        { value: "Menunggu Pembuatan", label: "Menunggu" },
                        { value: "Ditolak", label: "Ditolak" },
                      ]}
                    />
                    <SegmentedToggle
                      value={viewMode}
                      onChange={(v) => setViewMode(v as "grid" | "table")}
                      options={[
                        { value: "grid", icon: "ri-grid-line" },
                        { value: "table", icon: "ri-list-check" },
                      ]}
                    />
                    <button
                      onClick={() => setShowInfo(true)}
                      className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary text-sm"
                    >
                      Info
                    </button>
                  </div>
                </div>
              </div>
              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">
                    Data AK1
                  </h2>
                }
                className="overflow-hidden"
              >
                {viewMode === "grid" ? (
                  <CardGrid>
                    {paginatedAk1.map((r) => (
                      <div
                        key={`ak1-${r.candidate_id}-${r.nik}`}
                        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-bold text-primary text-sm leading-tight truncate">
                                {r.full_name || "-"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {r.nik || "-"}
                              </p>
                            </div>
                            {(() => {
                              const ui =
                                apiToUIStatusAk1[
                                  String(r.status || "").toUpperCase()
                                ] || "Menunggu Pembuatan";
                              return (
                                <span
                                  className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(ui)}`}
                                >
                                  {ui}
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-xs text-gray-600">
                              {r.file ? (
                                <button
                                  className="text-primary underline"
                                  onClick={async () => {
                                    const d = await presignDownload(
                                      r.file as string,
                                    );
                                    window.open(d.url, "_blank");
                                  }}
                                >
                                  Unduh Kartu
                                </button>
                              ) : (
                                <span>-</span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="px-3 py-1 text-xs rounded bg-secondary text-white hover:brightness-95"
                                onClick={async () => {
                                  const d = await getAk1Document(
                                    undefined,
                                    r.candidate_id,
                                  );
                                  const cand: CandidateProfileLite = {
                                    full_name: r.full_name,
                                    nik: r.nik,
                                    place_of_birth: r.place_of_birth,
                                    birthdate: r.birthdate,
                                  };
                                  setDetailData({
                                    candidate: cand,
                                    document: d.data || null,
                                  });
                                  setShowDetailModal(true);
                                }}
                              >
                                Detail
                              </button>
                              {permissions.includes("ak1.verify") &&
                                r.file &&
                                (apiToUIStatusAk1[
                                  String(r.status || "").toUpperCase()
                                ] || "Menunggu Pembuatan") ===
                                  "Menunggu Pembuatan" && (
                                  <button
                                    className="px-3 py-1 text-xs rounded bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                                    onClick={async () => {
                                      const d = await getAk1Document(
                                        undefined,
                                        r.candidate_id,
                                      );
                                      const cand: CandidateProfileLite = {
                                        full_name: r.full_name,
                                        nik: r.nik,
                                        place_of_birth: r.place_of_birth,
                                        birthdate: r.birthdate,
                                      };
                                      setDetailData({
                                        candidate: cand,
                                        document: d.data || null,
                                      });
                                      setVerifyPayload({
                                        ak1_document_id:
                                          r.ak1_document_id || "",
                                        status: "APPROVED",
                                      });
                                      setShowVerifyModal(true);
                                    }}
                                  >
                                    Verifikasi
                                  </button>
                                )}
                              {permissions.includes("ak1.verify") &&
                                r.file &&
                                (apiToUIStatusAk1[
                                  String(r.status || "").toUpperCase()
                                ] || "") === "Menunggu Perpanjangan" && (
                                  <button
                                    className="px-3 py-1 text-xs rounded bg-orange-500 text-white hover:bg-orange-600"
                                    onClick={async () => {
                                      setGenerating(true);
                                      try {
                                        // Prepare renewal data
                                        setGenMeta({
                                          ak1_document_id: r.ak1_document_id,
                                          candidate_id: r.candidate_id,
                                          no_urut_pendaftaran: "", // Will be filled from doc if exists
                                          card_created_at: "",
                                        });
                                        setGenCandidate({
                                          full_name: r.full_name,
                                          nik: r.nik,
                                          place_of_birth: r.place_of_birth,
                                          birthdate: r.birthdate,
                                        } as CandidateProfileLite);

                                        // Fetch templates
                                        try {
                                          const tList =
                                            await listAk1Templates();
                                          const allTemplates = tList.data || [];
                                          setTemplates(allTemplates);
                                          const layoutMap: Record<
                                            string,
                                            Ak1Layout
                                          > = {};
                                          await Promise.all(
                                            allTemplates.map(
                                              async (t: Ak1Template) => {
                                                if (t.id) {
                                                  try {
                                                    const lResp =
                                                      await getAk1Layout(t.id);
                                                    if (lResp.data)
                                                      layoutMap[t.id] =
                                                        lResp.data;
                                                  } catch {}
                                                }
                                              },
                                            ),
                                          );
                                          setLayouts(layoutMap);
                                        } catch {}

                                        // Fetch details
                                        const prof =
                                          await getCandidateProfileById(
                                            r.candidate_id,
                                          );
                                        const cand =
                                          (
                                            prof as {
                                              data?: CandidateProfileLite | null;
                                            }
                                          ).data || null;
                                        setGenCandidate(cand);

                                        const d = await getAk1Document(
                                          undefined,
                                          r.candidate_id,
                                        );
                                        const doc = d.data || null;
                                        setGenDocDetail(doc);

                                        // Set existing no_urut if available
                                        if (doc?.no_urut_pendaftaran) {
                                          setGenMeta((prev) => ({
                                            ...prev,
                                            no_urut_pendaftaran:
                                              doc.no_urut_pendaftaran,
                                          }));
                                        }
                                        if (doc?.card_created_at) {
                                          setGenMeta((prev) => ({
                                            ...prev,
                                            card_created_at: String(
                                              doc.card_created_at,
                                            ),
                                          }));
                                        }

                                        // Prepare preview with new renewal NIP
                                        if (doc && currentDisnaker?.nip) {
                                          const previewDoc = { ...doc };
                                          // Determine which slot
                                          if (!doc.nip_renew_1) {
                                            previewDoc.nip_renew_1 =
                                              currentDisnaker.nip;
                                            previewDoc.date_renew_1 =
                                              new Date().toISOString();
                                            // Clear future
                                            previewDoc.nip_renew_2 = null;
                                            previewDoc.date_renew_2 = null;
                                            previewDoc.nip_renew_3 = null;
                                            previewDoc.date_renew_3 = null;
                                          } else if (!doc.nip_renew_2) {
                                            previewDoc.nip_renew_2 =
                                              currentDisnaker.nip;
                                            previewDoc.date_renew_2 =
                                              new Date().toISOString();
                                            // Clear future
                                            previewDoc.nip_renew_3 = null;
                                            previewDoc.date_renew_3 = null;
                                          } else if (!doc.nip_renew_3) {
                                            previewDoc.nip_renew_3 =
                                              currentDisnaker.nip;
                                            previewDoc.date_renew_3 =
                                              new Date().toISOString();
                                          }
                                          setGenDocDetail(doc);
                                          setRenewPreviewDoc(previewDoc);
                                        }

                                        // Photo
                                        try {
                                          const rawPhoto = String(
                                            doc?.pas_photo_file || "",
                                          );
                                          if (rawPhoto) {
                                            const pre =
                                              await presignDownload(rawPhoto);
                                            setGenPasPhotoUrl(pre.url);
                                          } else setGenPasPhotoUrl(null);
                                        } catch {
                                          setGenPasPhotoUrl(null);
                                        }

                                        // User data
                                        try {
                                          if (cand?.user_id) {
                                            const u = await getUserById(
                                              String(cand.user_id),
                                            );
                                            const env = u as {
                                              data?: Record<string, unknown>;
                                            };
                                            setGenUser(
                                              (env.data || u) as Record<
                                                string,
                                                unknown
                                              >,
                                            );
                                          }
                                        } catch {}

                                        setShowRenewModal(true);
                                      } catch {
                                        showError(
                                          "Gagal memuat data untuk perpanjangan",
                                        );
                                      } finally {
                                        setGenerating(false);
                                      }
                                    }}
                                  >
                                    Perpanjangan
                                  </button>
                                )}
                              {permissions.includes("ak1.generate") &&
                                !r.file && (
                                  <button
                                    className="px-3 py-1 text-xs rounded bg-secondary text-white hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={generating}
                                    onClick={async () => {
                                      setGenerating(true);
                                      try {
                                        setGenMeta({
                                          ak1_document_id: r.ak1_document_id,
                                          candidate_id: r.candidate_id,
                                          no_urut_pendaftaran: "",
                                          card_created_at: "",
                                        });
                                        setGenCandidate({
                                          full_name: r.full_name,
                                          nik: r.nik,
                                          place_of_birth: r.place_of_birth,
                                          birthdate: r.birthdate,
                                        } as CandidateProfileLite);
                                        setGenDocDetail(null);
                                        try {
                                          const tList =
                                            await listAk1Templates();
                                          const allTemplates = tList.data || [];
                                          setTemplates(allTemplates);

                                          const layoutMap: Record<
                                            string,
                                            Ak1Layout
                                          > = {};
                                          await Promise.all(
                                            allTemplates.map(
                                              async (t: Ak1Template) => {
                                                if (t.id) {
                                                  try {
                                                    const lResp =
                                                      await getAk1Layout(t.id);
                                                    if (lResp.data) {
                                                      layoutMap[t.id] =
                                                        lResp.data;
                                                    }
                                                  } catch {}
                                                }
                                              },
                                            ),
                                          );
                                          setLayouts(layoutMap);
                                        } catch (e) {
                                          console.error(
                                            "Error fetching templates:",
                                            e,
                                          );
                                        }

                                        try {
                                          const prof =
                                            await getCandidateProfileById(
                                              r.candidate_id,
                                            );
                                          const cand =
                                            (
                                              prof as {
                                                data?: CandidateProfileLite | null;
                                              }
                                            ).data || null;
                                          setGenCandidate(cand);
                                          try {
                                            const cid = String(
                                              cand?.user_id || "",
                                            );
                                            if (cid) {
                                              const u = await getUserById(cid);
                                              const env = u as {
                                                data?: Record<string, unknown>;
                                              };
                                              const ud: Record<
                                                string,
                                                unknown
                                              > =
                                                env && env.data !== undefined
                                                  ? (env.data as Record<
                                                      string,
                                                      unknown
                                                    >)
                                                  : (u as unknown as Record<
                                                      string,
                                                      unknown
                                                    >);
                                              setGenUser(ud || null);
                                            }
                                          } catch {}
                                          const d = await getAk1Document(
                                            undefined,
                                            r.candidate_id,
                                          );
                                          setGenDocDetail(d.data || null);
                                          try {
                                            const rawPhoto = (() => {
                                              const env = d as {
                                                data?: {
                                                  pas_photo_file?: string;
                                                };
                                              };
                                              return String(
                                                env?.data?.pas_photo_file || "",
                                              );
                                            })();
                                            if (rawPhoto) {
                                              const pre =
                                                await presignDownload(rawPhoto);
                                              setGenPasPhotoUrl(pre.url);
                                            } else {
                                              setGenPasPhotoUrl(null);
                                            }
                                          } catch {
                                            setGenPasPhotoUrl(null);
                                          }
                                          try {
                                            const candUserId = (() => {
                                              try {
                                                return String(
                                                  (
                                                    (cand as unknown as {
                                                      user_id?: string;
                                                    }) || {}
                                                  )?.user_id || "",
                                                );
                                              } catch {
                                                return "";
                                              }
                                            })();
                                            const docUserId = (() => {
                                              try {
                                                return String(
                                                  (
                                                    (d?.data as unknown as {
                                                      user_id?: string;
                                                    }) || {}
                                                  )?.user_id || "",
                                                );
                                              } catch {
                                                return "";
                                              }
                                            })();
                                            const userId =
                                              candUserId || docUserId;
                                            if (userId) {
                                              const u =
                                                await getUserById(userId);
                                              const env = u as {
                                                data?: Record<string, unknown>;
                                              };
                                              const ud: Record<
                                                string,
                                                unknown
                                              > =
                                                env && env.data !== undefined
                                                  ? (env.data as Record<
                                                      string,
                                                      unknown
                                                    >)
                                                  : (u as unknown as Record<
                                                      string,
                                                      unknown
                                                    >);
                                              setGenUser(ud || null);
                                            }
                                          } catch {}
                                        } catch {}
                                      } catch {
                                      } finally {
                                        setGenerating(false);
                                      }
                                      setShowGenerateModal(true);
                                    }}
                                  >
                                    {generating ? "Loading..." : "Generate"}
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardGrid>
                ) : (
                  <>
                    <Table className="hidden sm:block">
                      <TableHead>
                        <tr>
                          <TH>Nama</TH>
                          <TH>NIK</TH>
                          <TH>Status</TH>
                          <TH>File</TH>
                          <TH>Aksi</TH>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {paginatedAk1.map((r, i) => (
                          <TableRow key={`${r.candidate_id}-${r.nik}-${i}`}>
                            <TD className="text-gray-900">
                              {r.full_name || "-"}
                            </TD>
                            <TD className="text-gray-900">{r.nik || "-"}</TD>
                            <TD>
                              {(() => {
                                const ui =
                                  apiToUIStatusAk1[
                                    String(r.status || "").toUpperCase()
                                  ] || "Menunggu Pembuatan";
                                return (
                                  <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ui)}`}
                                  >
                                    {ui}
                                  </span>
                                );
                              })()}
                            </TD>
                            <TD>
                              {r.file ? (
                                <button
                                  className="text-primary underline"
                                  onClick={async () => {
                                    const d = await presignDownload(
                                      r.file as string,
                                    );
                                    window.open(d.url, "_blank");
                                  }}
                                >
                                  Unduh
                                </button>
                              ) : (
                                "-"
                              )}
                            </TD>
                            <TD>
                              <div className="flex gap-2">
                                <button
                                  className="px-3 py-1 text-xs rounded bg-secondary text-white hover:brightness-95"
                                  onClick={async () => {
                                    const d = await getAk1Document(
                                      undefined,
                                      r.candidate_id,
                                    );
                                    const cand: CandidateProfileLite = {
                                      full_name: r.full_name,
                                      nik: r.nik,
                                      place_of_birth: r.place_of_birth,
                                      birthdate: r.birthdate,
                                    };
                                    setDetailData({
                                      candidate: cand,
                                      document: d.data || null,
                                    });
                                    setShowDetailModal(true);
                                  }}
                                >
                                  Detail
                                </button>
                                {permissions.includes("ak1.verify") &&
                                  r.file &&
                                  (apiToUIStatusAk1[
                                    String(r.status || "").toUpperCase()
                                  ] || "Menunggu Pembuatan") ===
                                    "Menunggu Pembuatan" && (
                                    <button
                                      className="px-3 py-1 text-xs rounded bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                                      onClick={async () => {
                                        const d = await getAk1Document(
                                          undefined,
                                          r.candidate_id,
                                        );
                                        const cand: CandidateProfileLite = {
                                          full_name: r.full_name,
                                          nik: r.nik,
                                          place_of_birth: r.place_of_birth,
                                          birthdate: r.birthdate,
                                        };
                                        setDetailData({
                                          candidate: cand,
                                          document: d.data || null,
                                        });
                                        setVerifyPayload({
                                          ak1_document_id:
                                            r.ak1_document_id || "",
                                          status: "APPROVED",
                                        });
                                        setShowVerifyModal(true);
                                      }}
                                    >
                                      Verifikasi
                                    </button>
                                  )}
                                {permissions.includes("ak1.verify") &&
                                  r.file &&
                                  (apiToUIStatusAk1[
                                    String(r.status || "").toUpperCase()
                                  ] || "") === "Menunggu Perpanjangan" && (
                                    <button
                                      className="px-3 py-1 text-xs rounded bg-orange-500 text-white hover:bg-orange-600"
                                      onClick={async () => {
                                        setGenerating(true);
                                        try {
                                          // Prepare renewal data
                                          setGenMeta({
                                            ak1_document_id: r.ak1_document_id,
                                            candidate_id: r.candidate_id,
                                            no_urut_pendaftaran: "",
                                            card_created_at: "",
                                          });
                                          setGenCandidate({
                                            full_name: r.full_name,
                                            nik: r.nik,
                                            place_of_birth: r.place_of_birth,
                                            birthdate: r.birthdate,
                                          } as CandidateProfileLite);

                                          // Fetch templates
                                          try {
                                            const tList =
                                              await listAk1Templates();
                                            const allTemplates =
                                              tList.data || [];
                                            setTemplates(allTemplates);
                                            const layoutMap: Record<
                                              string,
                                              Ak1Layout
                                            > = {};
                                            await Promise.all(
                                              allTemplates.map(
                                                async (t: Ak1Template) => {
                                                  if (t.id) {
                                                    try {
                                                      const lResp =
                                                        await getAk1Layout(
                                                          t.id,
                                                        );
                                                      if (lResp.data)
                                                        layoutMap[t.id] =
                                                          lResp.data;
                                                    } catch {}
                                                  }
                                                },
                                              ),
                                            );
                                            setLayouts(layoutMap);
                                          } catch {}

                                          // Fetch details
                                          const prof =
                                            await getCandidateProfileById(
                                              r.candidate_id,
                                            );
                                          const cand =
                                            (
                                              prof as {
                                                data?: CandidateProfileLite | null;
                                              }
                                            ).data || null;
                                          setGenCandidate(cand);

                                          const d = await getAk1Document(
                                            undefined,
                                            r.candidate_id,
                                          );
                                          const doc = d.data || null;
                                          setGenDocDetail(doc);

                                          if (doc?.no_urut_pendaftaran) {
                                            setGenMeta((prev) => ({
                                              ...prev,
                                              no_urut_pendaftaran:
                                                doc.no_urut_pendaftaran,
                                            }));
                                          }
                                          if (doc?.card_created_at) {
                                            setGenMeta((prev) => ({
                                              ...prev,
                                              card_created_at: String(
                                                doc.card_created_at,
                                              ),
                                            }));
                                          }

                                          // Prepare preview with new renewal NIP
                                          if (doc && currentDisnaker?.nip) {
                                            const previewDoc = { ...doc };
                                            if (!doc.nip_renew_1) {
                                              previewDoc.nip_renew_1 =
                                                currentDisnaker.nip;
                                              previewDoc.date_renew_1 =
                                                new Date().toISOString();
                                              // Clear future
                                              previewDoc.nip_renew_2 = null;
                                              previewDoc.date_renew_2 = null;
                                              previewDoc.nip_renew_3 = null;
                                              previewDoc.date_renew_3 = null;
                                            } else if (!doc.nip_renew_2) {
                                              previewDoc.nip_renew_2 =
                                                currentDisnaker.nip;
                                              previewDoc.date_renew_2 =
                                                new Date().toISOString();
                                              // Clear future
                                              previewDoc.nip_renew_3 = null;
                                              previewDoc.date_renew_3 = null;
                                            } else if (!doc.nip_renew_3) {
                                              previewDoc.nip_renew_3 =
                                                currentDisnaker.nip;
                                              previewDoc.date_renew_3 =
                                                new Date().toISOString();
                                            }
                                            setGenDocDetail(doc);
                                            setRenewPreviewDoc(previewDoc);
                                          }

                                          // Photo
                                          try {
                                            const rawPhoto = String(
                                              doc?.pas_photo_file || "",
                                            );
                                            if (rawPhoto) {
                                              const pre =
                                                await presignDownload(rawPhoto);
                                              setGenPasPhotoUrl(pre.url);
                                            } else setGenPasPhotoUrl(null);
                                          } catch {
                                            setGenPasPhotoUrl(null);
                                          }

                                          // User data
                                          try {
                                            if (cand?.user_id) {
                                              const u = await getUserById(
                                                String(cand.user_id),
                                              );
                                              const env = u as {
                                                data?: Record<string, unknown>;
                                              };
                                              setGenUser(
                                                (env.data || u) as Record<
                                                  string,
                                                  unknown
                                                >,
                                              );
                                            }
                                          } catch {}

                                          setShowRenewModal(true);
                                        } catch {
                                          showError(
                                            "Gagal memuat data untuk perpanjangan",
                                          );
                                        } finally {
                                          setGenerating(false);
                                        }
                                      }}
                                    >
                                      Perpanjangan
                                    </button>
                                  )}
                                {permissions.includes("ak1.generate") &&
                                  !r.file && (
                                    <button
                                      className="px-3 py-1 text-xs rounded bg-secondary text-white hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                      disabled={generating}
                                      onClick={async () => {
                                        setGenerating(true);
                                        try {
                                          setGenMeta({
                                            ak1_document_id: r.ak1_document_id,
                                            candidate_id: r.candidate_id,
                                            no_urut_pendaftaran: "",
                                            card_created_at: "",
                                          });
                                          setGenCandidate({
                                            full_name: r.full_name,
                                            nik: r.nik,
                                            place_of_birth: r.place_of_birth,
                                            birthdate: r.birthdate,
                                          } as CandidateProfileLite);
                                          setGenDocDetail(null);

                                          // 1. Fetch all templates
                                          const tpListResp =
                                            await listAk1Templates();
                                          const allTps = (tpListResp.data ||
                                            []) as Ak1Template[];
                                          setTemplates(allTps);

                                          // 2. Fetch all layouts
                                          const layoutMap: Record<
                                            string,
                                            Ak1Layout
                                          > = {};
                                          await Promise.all(
                                            allTps.map(async (t) => {
                                              if (t.id) {
                                                try {
                                                  const resp =
                                                    await getAk1Layout(t.id);
                                                  const ly = (
                                                    resp as {
                                                      data?: Ak1Layout | null;
                                                    }
                                                  ).data;
                                                  if (ly) {
                                                    layoutMap[t.id] = ly;
                                                  }
                                                } catch (e) {
                                                  console.error(
                                                    `Failed to fetch layout for template ${t.id}`,
                                                    e,
                                                  );
                                                }
                                              }
                                            }),
                                          );
                                          setLayouts(layoutMap);
                                          try {
                                            const prof =
                                              await getCandidateProfileById(
                                                r.candidate_id,
                                              );
                                            const cand =
                                              (
                                                prof as {
                                                  data?: CandidateProfileLite | null;
                                                }
                                              ).data || null;
                                            setGenCandidate(cand);
                                            try {
                                              const cid = String(
                                                cand?.user_id || "",
                                              );
                                              if (cid) {
                                                const u =
                                                  await getUserById(cid);
                                                const env = u as {
                                                  data?: Record<
                                                    string,
                                                    unknown
                                                  >;
                                                };
                                                const ud: Record<
                                                  string,
                                                  unknown
                                                > =
                                                  env && env.data !== undefined
                                                    ? (env.data as Record<
                                                        string,
                                                        unknown
                                                      >)
                                                    : (u as unknown as Record<
                                                        string,
                                                        unknown
                                                      >);
                                                setGenUser(ud || null);
                                              }
                                            } catch {}
                                            const d = await getAk1Document(
                                              undefined,
                                              r.candidate_id,
                                            );
                                            setGenDocDetail(d.data || null);
                                            try {
                                              const rawPhoto = (() => {
                                                const env = d as {
                                                  data?: {
                                                    pas_photo_file?: string;
                                                  };
                                                };
                                                return String(
                                                  env?.data?.pas_photo_file ||
                                                    "",
                                                );
                                              })();
                                              if (rawPhoto) {
                                                const pre =
                                                  await presignDownload(
                                                    rawPhoto,
                                                  );
                                                setGenPasPhotoUrl(pre.url);
                                              } else {
                                                setGenPasPhotoUrl(null);
                                              }
                                            } catch {
                                              setGenPasPhotoUrl(null);
                                            }
                                            try {
                                              const candUserId = (() => {
                                                try {
                                                  return String(
                                                    (
                                                      (cand as unknown as {
                                                        user_id?: string;
                                                      }) || {}
                                                    )?.user_id || "",
                                                  );
                                                } catch {
                                                  return "";
                                                }
                                              })();
                                              const docUserId = (() => {
                                                try {
                                                  return String(
                                                    (
                                                      (d?.data as unknown as {
                                                        user_id?: string;
                                                      }) || {}
                                                    )?.user_id || "",
                                                  );
                                                } catch {
                                                  return "";
                                                }
                                              })();
                                              const userId =
                                                candUserId || docUserId;
                                              if (userId) {
                                                const u =
                                                  await getUserById(userId);
                                                const env = u as {
                                                  data?: Record<
                                                    string,
                                                    unknown
                                                  >;
                                                };
                                                const ud: Record<
                                                  string,
                                                  unknown
                                                > =
                                                  env && env.data !== undefined
                                                    ? (env.data as Record<
                                                        string,
                                                        unknown
                                                      >)
                                                    : (u as unknown as Record<
                                                        string,
                                                        unknown
                                                      >);
                                                setGenUser(ud || null);
                                              }
                                            } catch {}
                                          } catch {}
                                        } catch {
                                        } finally {
                                          setGenerating(false);
                                        }
                                        setShowGenerateModal(true);
                                      }}
                                    >
                                      {generating ? "Loading..." : "Generate"}
                                    </button>
                                  )}
                              </div>
                            </TD>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="sm:hidden p-3 space-y-3">
                      {paginatedAk1.map((r, idx) => (
                        <div
                          key={`m-${r.candidate_id}-${r.nik}-${idx}`}
                          className="border border-gray-200 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="min-w-0">
                              <p className="font-semibold text-primary truncate">
                                {r.full_name || "-"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {r.nik || "-"}
                              </p>
                            </div>
                            {(() => {
                              const ui =
                                apiToUIStatusAk1[
                                  String(r.status || "").toUpperCase()
                                ] || "Menunggu Pembuatan";
                              return (
                                <span
                                  className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(ui)}`}
                                >
                                  {ui}
                                </span>
                              );
                            })()}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <button
                              className="flex-1 px-3 py-2 text-xs bg-secondary text-white rounded hover:brightness-95 transition"
                              onClick={async () => {
                                const d = await getAk1Document(
                                  undefined,
                                  r.candidate_id,
                                );
                                const cand: CandidateProfileLite = {
                                  full_name: r.full_name,
                                  nik: r.nik,
                                  place_of_birth: r.place_of_birth,
                                  birthdate: r.birthdate,
                                };
                                setDetailData({
                                  candidate: cand,
                                  document: d.data || null,
                                });
                                setShowDetailModal(true);
                              }}
                            >
                              Detail
                            </button>
                            {permissions.includes("ak1.verify") &&
                              r.file &&
                              (apiToUIStatusAk1[
                                String(r.status || "").toUpperCase()
                              ] || "Menunggu Pembuatan") ===
                                "Menunggu Pembuatan" && (
                                <button
                                  className="flex-1 px-3 py-2 text-xs bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition"
                                  onClick={async () => {
                                    const d = await getAk1Document(
                                      undefined,
                                      r.candidate_id,
                                    );
                                    const cand: CandidateProfileLite = {
                                      full_name: r.full_name,
                                      nik: r.nik,
                                      place_of_birth: r.place_of_birth,
                                      birthdate: r.birthdate,
                                    };
                                    setDetailData({
                                      candidate: cand,
                                      document: d.data || null,
                                    });
                                    setVerifyPayload({
                                      ak1_document_id: r.ak1_document_id || "",
                                      status: "APPROVED",
                                    });
                                    setShowVerifyModal(true);
                                  }}
                                >
                                  Verifikasi
                                </button>
                              )}
                            {permissions.includes("ak1.verify") &&
                              r.file &&
                              (apiToUIStatusAk1[
                                String(r.status || "").toUpperCase()
                              ] || "") === "Menunggu Perpanjangan" && (
                                <button
                                  className="flex-1 px-3 py-2 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                                  onClick={async () => {
                                    setGenerating(true);
                                    try {
                                      setGenMeta({
                                        ak1_document_id: r.ak1_document_id,
                                        candidate_id: r.candidate_id,
                                        no_urut_pendaftaran: "",
                                        card_created_at: "",
                                      });
                                      setGenCandidate({
                                        full_name: r.full_name,
                                        nik: r.nik,
                                        place_of_birth: r.place_of_birth,
                                        birthdate: r.birthdate,
                                      } as CandidateProfileLite);
                                      try {
                                        const tList = await listAk1Templates();
                                        const allTemplates = tList.data || [];
                                        setTemplates(allTemplates);
                                        const layoutMap: Record<
                                          string,
                                          Ak1Layout
                                        > = {};
                                        await Promise.all(
                                          allTemplates.map(
                                            async (t: Ak1Template) => {
                                              if (t.id) {
                                                try {
                                                  const lResp =
                                                    await getAk1Layout(t.id);
                                                  if (lResp.data)
                                                    layoutMap[t.id] =
                                                      lResp.data;
                                                } catch {}
                                              }
                                            },
                                          ),
                                        );
                                        setLayouts(layoutMap);
                                      } catch {}

                                      const prof =
                                        await getCandidateProfileById(
                                          r.candidate_id,
                                        );
                                      const cand =
                                        (
                                          prof as {
                                            data?: CandidateProfileLite | null;
                                          }
                                        ).data || null;
                                      setGenCandidate(cand);

                                      const d = await getAk1Document(
                                        undefined,
                                        r.candidate_id,
                                      );
                                      const doc = d.data || null;
                                      setGenDocDetail(doc);

                                      if (doc?.no_urut_pendaftaran) {
                                        setGenMeta((prev) => ({
                                          ...prev,
                                          no_urut_pendaftaran:
                                            doc.no_urut_pendaftaran,
                                        }));
                                      }
                                      if (doc?.card_created_at) {
                                        setGenMeta((prev) => ({
                                          ...prev,
                                          card_created_at: String(
                                            doc.card_created_at,
                                          ),
                                        }));
                                      }

                                      if (doc && currentDisnaker?.nip) {
                                        const previewDoc = { ...doc };
                                        if (!doc.nip_renew_1) {
                                          previewDoc.nip_renew_1 =
                                            currentDisnaker.nip;
                                          previewDoc.date_renew_1 =
                                            new Date().toISOString();
                                          // Clear future
                                          previewDoc.nip_renew_2 = null;
                                          previewDoc.date_renew_2 = null;
                                          previewDoc.nip_renew_3 = null;
                                          previewDoc.date_renew_3 = null;
                                        } else if (!doc.nip_renew_2) {
                                          previewDoc.nip_renew_2 =
                                            currentDisnaker.nip;
                                          previewDoc.date_renew_2 =
                                            new Date().toISOString();
                                          // Clear future
                                          previewDoc.nip_renew_3 = null;
                                          previewDoc.date_renew_3 = null;
                                        } else if (!doc.nip_renew_3) {
                                          previewDoc.nip_renew_3 =
                                            currentDisnaker.nip;
                                          previewDoc.date_renew_3 =
                                            new Date().toISOString();
                                        }
                                        setGenDocDetail(doc);
                                        setRenewPreviewDoc(previewDoc);
                                      }

                                      try {
                                        const rawPhoto = String(
                                          doc?.pas_photo_file || "",
                                        );
                                        if (rawPhoto) {
                                          const pre =
                                            await presignDownload(rawPhoto);
                                          setGenPasPhotoUrl(pre.url);
                                        } else setGenPasPhotoUrl(null);
                                      } catch {
                                        setGenPasPhotoUrl(null);
                                      }

                                      try {
                                        if (cand?.user_id) {
                                          const u = await getUserById(
                                            String(cand.user_id),
                                          );
                                          const env = u as {
                                            data?: Record<string, unknown>;
                                          };
                                          setGenUser(
                                            (env.data || u) as Record<
                                              string,
                                              unknown
                                            >,
                                          );
                                        }
                                      } catch {}

                                      setShowRenewModal(true);
                                    } catch {
                                      showError(
                                        "Gagal memuat data untuk perpanjangan",
                                      );
                                    } finally {
                                      setGenerating(false);
                                    }
                                  }}
                                >
                                  Perpanjangan
                                </button>
                              )}
                            {permissions.includes("ak1.generate") &&
                              !r.file && (
                                <button
                                  className="flex-1 px-3 py-2 text-xs bg-secondary text-white rounded hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={generating}
                                  onClick={async () => {
                                    setGenerating(true);
                                    try {
                                      setGenMeta({
                                        ak1_document_id: r.ak1_document_id,
                                        candidate_id: r.candidate_id,
                                        no_urut_pendaftaran: "",
                                        card_created_at: "",
                                      });
                                      setGenCandidate({
                                        full_name: r.full_name,
                                        nik: r.nik,
                                        place_of_birth: r.place_of_birth,
                                        birthdate: r.birthdate,
                                      } as CandidateProfileLite);
                                      setGenDocDetail(null);

                                      try {
                                        const tList = await listAk1Templates();
                                        const allTemplates = tList.data || [];
                                        setTemplates(allTemplates);

                                        const layoutMap: Record<
                                          string,
                                          Ak1Layout
                                        > = {};
                                        await Promise.all(
                                          allTemplates.map(
                                            async (t: Ak1Template) => {
                                              if (t.id) {
                                                try {
                                                  const lResp =
                                                    await getAk1Layout(t.id);
                                                  if (lResp.data) {
                                                    layoutMap[t.id] =
                                                      lResp.data;
                                                  }
                                                } catch {}
                                              }
                                            },
                                          ),
                                        );
                                        setLayouts(layoutMap);
                                      } catch (e) {
                                        console.error(
                                          "Error fetching templates:",
                                          e,
                                        );
                                      }

                                      try {
                                        const prof =
                                          await getCandidateProfileById(
                                            r.candidate_id,
                                          );
                                        const cand =
                                          (
                                            prof as {
                                              data?: CandidateProfileLite | null;
                                            }
                                          ).data || null;
                                        setGenCandidate(cand);
                                        const d = await getAk1Document(
                                          undefined,
                                          r.candidate_id,
                                        );
                                        setGenDocDetail(d.data || null);
                                      } catch {}
                                    } catch {
                                    } finally {
                                      setGenerating(false);
                                    }
                                    setShowGenerateModal(true);
                                  }}
                                >
                                  {generating ? "Loading..." : "Generate"}
                                </button>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Card>
              <div className="mt-4">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={filteredAk1.length}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                />
              </div>
            </>
          )}

          <Modal
            open={showInfo}
            title="Tentang AK1"
            onClose={() => setShowInfo(false)}
            actions={
              <button
                onClick={() => setShowInfo(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
              >
                Tutup
              </button>
            }
          >
            <p className="text-sm text-gray-500">
              Setelah dokumen diunggah dan profil lengkap, AK1 akan diverifikasi
              oleh petugas Disnaker. Jika disetujui, kartu dapat diunduh di
              halaman ini.
            </p>
          </Modal>

          <Modal
            open={showGenerateModal}
            title="Generate Kartu AK1"
            size="full"
            onClose={() => setShowGenerateModal(false)}
            actions={
              <>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Tutup
                </button>
                <button
                  disabled={generating}
                  onClick={async () => {
                    setGenerating(true);
                    try {
                      if (!genMeta.ak1_document_id) {
                        showError("Data AK1 tidak ditemukan.");
                        return;
                      }
                      // Zod validation for no_urut_pendaftaran (exactly 8 digits)
                      const valid = ak1NoUrutSchema.safeParse({
                        no_urut_pendaftaran: String(
                          genMeta.no_urut_pendaftaran || "",
                        ),
                      });
                      if (!valid.success) {
                        const msg =
                          valid.error.issues[0]?.message ||
                          "No Urut Pendaftaran tidak valid";
                        showError(msg);
                        return;
                      }
                      // Optional client-side uniqueness check (best-effort; backend also enforces)
                      try {
                        const list = await listAk1Documents();
                        const raw = (list as { data?: unknown })?.data || [];
                        const toStr = (
                          obj: Record<string, unknown>,
                          key: string,
                        ): string | undefined => {
                          const v = obj[key];
                          return typeof v === "string" ? v : undefined;
                        };
                        const items: Array<{
                          id?: string;
                          ak1_document_id?: string;
                          no_urut_pendaftaran?: string;
                        }> = Array.isArray(raw)
                          ? (raw as Array<unknown>).map((u) => {
                              const r = (u || {}) as Record<string, unknown>;
                              return {
                                id: toStr(r, "id"),
                                ak1_document_id: toStr(r, "ak1_document_id"),
                                no_urut_pendaftaran: toStr(
                                  r,
                                  "no_urut_pendaftaran",
                                ),
                              };
                            })
                          : [];
                        const exists = items.some((d) => {
                          const val = String(d.no_urut_pendaftaran || "");
                          const id = String(d.id || d.ak1_document_id || "");
                          return (
                            val === String(genMeta.no_urut_pendaftaran) &&
                            id !== String(genMeta.ak1_document_id || "")
                          );
                        });
                        if (exists) {
                          showError("No Urut Pendaftaran sudah digunakan.");
                          return;
                        }
                      } catch {}
                      const blob = await generateAk1Pdf();
                      const filename = `ak1_${genMeta.candidate_id || "unknown"}.pdf`;
                      const pre = await presignUpload(
                        "ak1_cards",
                        filename,
                        "application/pdf",
                      );
                      const resp = await fetch(pre.url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/pdf" },
                        body: blob,
                      });
                      if (!resp.ok) {
                        const txt = await resp.text();
                        showError(`Upload gagal (${resp.status}): ${txt}`);
                        return;
                      }
                      const objectUrl =
                        pre.public_url ||
                        (pre.url.includes("?")
                          ? pre.url.slice(0, pre.url.indexOf("?"))
                          : pre.url);

                      if (!genNoReg) {
                        showError(
                          "No Pendaftaran Pencari Kerja gagal digenerate. Pastikan NIK, Tgl Lahir, dan No Urut lengkap.",
                        );
                        return;
                      }

                      const baseCreated = genMeta.card_created_at
                        ? new Date(genMeta.card_created_at)
                        : new Date();
                      if (Number.isNaN(baseCreated.getTime()))
                        baseCreated.setTime(Date.now());

                      const getExp = (months: number) => {
                        const d = new Date(baseCreated);
                        d.setMonth(d.getMonth() + months);
                        return d.toISOString(); // Use ISO string for API
                      };

                      await verifyAk1({
                        ak1_document_id: String(genMeta.ak1_document_id),
                        status: "APPROVED",
                        file: objectUrl,
                        no_urut_pendaftaran: genMeta.no_urut_pendaftaran,
                        no_pendaftaran_pencari_kerja: genNoReg,
                        card_created_at: baseCreated.toISOString(),
                        expired1: getExp(6),
                        expired2: getExp(12),
                        expired3: getExp(18),
                        expired4: getExp(24),
                      });
                      setShowGenerateModal(false);
                      showSuccess(
                        "Kartu AK1 PDF berhasil digenerate & diverifikasi.",
                      );
                      const list = await listAk1Documents();
                      const items = (list?.data || []) as Array<{
                        id: string;
                        candidate_id: string;
                        full_name?: string;
                        nik?: string;
                        place_of_birth?: string;
                        birthdate?: string;
                        status?: string;
                        file?: string | null;
                        no_pendaftaran?: string;
                      }>;

                      const baseRows: Ak1Row[] = items.map((d) => ({
                        full_name: d.full_name,
                        nik: d.nik,
                        place_of_birth: d.place_of_birth,
                        birthdate: d.birthdate,
                        status: d.status,
                        file: d.file || null,
                        candidate_id: d.candidate_id,
                        ak1_document_id: d.id,
                        no_pendaftaran: d.no_pendaftaran,
                      }));

                      try {
                        const ids = Array.from(
                          new Set(baseRows.map((r) => r.candidate_id)),
                        ).filter(Boolean);
                        const candMap: Record<string, CandidateProfileLite> =
                          {};
                        await Promise.all(
                          ids.map(async (id) => {
                            try {
                              const prof = await getCandidateProfileById(
                                String(id),
                              );
                              const cand =
                                (prof as { data?: CandidateProfileLite | null })
                                  .data || null;
                              if (cand) candMap[String(id)] = cand;
                            } catch {}
                          }),
                        );
                        const enriched = baseRows.map((r) => ({
                          ...r,
                          full_name:
                            r.full_name ||
                            candMap[String(r.candidate_id)]?.full_name,
                          nik: r.nik || candMap[String(r.candidate_id)]?.nik,
                          place_of_birth:
                            r.place_of_birth ||
                            candMap[String(r.candidate_id)]?.place_of_birth,
                          birthdate:
                            r.birthdate ||
                            candMap[String(r.candidate_id)]?.birthdate,
                        }));
                        setRows(enriched);
                      } catch {
                        setRows(baseRows);
                      }
                    } catch {
                      showError("Gagal generate PDF AK1");
                    } finally {
                      setGenerating(false);
                    }
                  }}
                  className="ml-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? "Loading..." : "Simpan & Verifikasi"}
                </button>
              </>
            }
          >
            <div>
              <div className="mb-4">
                <label className="text-sm text-gray-700">
                  No Urut Pendaftaran
                  <Input
                    type="text"
                    className="mt-1 w-full"
                    value={genMeta.no_urut_pendaftaran || ""}
                    onChange={(e) =>
                      setGenMeta({
                        ...genMeta,
                        no_urut_pendaftaran: (e.target as HTMLInputElement)
                          .value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {templates.map((t) => (
                  <Ak1PreviewItem
                    key={t.id}
                    template={t}
                    layout={layouts[t.id || ""] || null}
                    candidate={genCandidate}
                    user={genUser}
                    doc={genDocDetail}
                    photoUrl={genPasPhotoUrl}
                    meta={genMeta}
                    noReg={genNoReg}
                    educationMap={educationMap}
                    currentDisnaker={currentDisnaker}
                    formatDate={formatDate}
                  />
                ))}
                {templates.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    Belum ada template yang tersedia.
                  </div>
                )}
              </div>
            </div>
          </Modal>

          <Modal
            open={showRenewModal}
            title="Perpanjangan Kartu AK1"
            size="full"
            onClose={() => setShowRenewModal(false)}
            actions={
              <>
                <button
                  onClick={() => setShowRenewModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Batal
                </button>
                <button
                  disabled={generating}
                  onClick={async () => {
                    setGenerating(true);
                    try {
                      const blob = await generateAk1Pdf(renewPreviewDoc);

                      // Upload via presign
                      const filename = `ak1_renew_${genMeta.ak1_document_id}_${Date.now()}.pdf`;
                      const pre = await presignUpload(
                        "ak1_cards",
                        filename,
                        "application/pdf",
                      );

                      const upRes = await fetch(pre.url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/pdf" },
                        body: blob,
                      });

                      if (!upRes.ok) throw new Error("Upload failed");

                      // Construct public URL (assuming standard S3 structure or usage of pre.key)
                      // Note: pre object might have public_url if backend provides it, or we construct it
                      const fileUrl =
                        (pre as Record<string, unknown>).public_url ||
                        pre.url.split("?")[0];

                      await approveAk1Renewal({
                        ak1_document_id: genMeta.ak1_document_id!,
                        card_file: fileUrl as string,
                      });

                      showSuccess("Perpanjangan berhasil disetujui");
                      setShowRenewModal(false);
                      window.location.reload();
                    } catch {
                      showError("Gagal memproses perpanjangan");
                    } finally {
                      setGenerating(false);
                    }
                  }}
                  className="ml-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
                >
                  {generating ? "Proses..." : "Simpan Perpanjangan"}
                </button>
              </>
            }
          >
            <div className="space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
                Pastikan data perpanjangan (NIP & Tanggal) sudah benar pada
                pratinjau di bawah ini.
              </div>
              {templates.map((t) => (
                <Ak1PreviewItem
                  key={t.id}
                  template={t}
                  layout={layouts[t.id || ""] || null}
                  candidate={genCandidate}
                  user={genUser}
                  doc={renewPreviewDoc}
                  photoUrl={genPasPhotoUrl}
                  meta={genMeta}
                  noReg={genNoReg}
                  educationMap={educationMap}
                  currentDisnaker={currentDisnaker}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </Modal>

          <Modal
            open={showDetailModal}
            title="Detail AK1"
            onClose={() => setShowDetailModal(false)}
            actions={
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
              >
                Tutup
              </button>
            }
          >
            <div className="text-sm text-gray-700 space-y-2">
              <div>
                Nama: {(detailData?.candidate || profile)?.full_name || "-"}
              </div>
              <div>NIK: {(detailData?.candidate || profile)?.nik || "-"}</div>
              <div>
                Tempat/Tgl Lahir:{" "}
                {(detailData?.candidate || profile)?.place_of_birth || "-"} /{" "}
                {String(
                  (detailData?.candidate || profile)?.birthdate || "",
                ).slice(0, 10) || "-"}
              </div>
              <hr className="my-2" />
              <div>
                KTP:{" "}
                {detailData?.document?.ktp_file ? (
                  <a
                    href={detailData.document.ktp_file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Lihat
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                Ijazah:{" "}
                {detailData?.document?.ijazah_file ? (
                  <a
                    href={detailData.document.ijazah_file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Lihat
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                Pas Foto:{" "}
                {detailData?.document?.pas_photo_file ? (
                  <a
                    href={detailData.document.pas_photo_file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Lihat
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                Sertifikat:{" "}
                {detailData?.document?.certificate_file ? (
                  <a
                    href={detailData.document.certificate_file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Lihat
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div>
                Kartu AK1:{" "}
                {detailData?.document?.card_file ? (
                  <a
                    href={detailData.document.card_file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    Unduh Kartu
                  </a>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </Modal>

          <Modal
            open={showVerifyModal}
            title="Verifikasi AK1"
            onClose={() => setShowVerifyModal(false)}
            actions={
              <>
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Batal
                </button>
                <button
                  onClick={async () => {
                    try {
                      await verifyAk1({
                        ak1_document_id: verifyPayload.ak1_document_id,
                        status: verifyPayload.status,
                        note: verifyPayload.note,
                      });
                      setRows((prev) =>
                        prev.map((r) =>
                          r.ak1_document_id === verifyPayload.ak1_document_id
                            ? { ...r, status: verifyPayload.status }
                            : r,
                        ),
                      );
                      setShowVerifyModal(false);
                      showSuccess("AK1 diverifikasi");
                    } catch {
                      showError("Gagal verifikasi AK1");
                    }
                  }}
                  className="ml-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                >
                  Simpan
                </button>
              </>
            }
          >
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-gray-700">
                Status
                <select
                  className="mt-1 w-full border rounded p-2"
                  value={verifyPayload.status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setVerifyPayload({
                      ...verifyPayload,
                      status: e.target.value as "APPROVED" | "REJECTED",
                    })
                  }
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </label>
              {verifyPayload.status === "REJECTED" && (
                <label className="text-sm text-gray-700">
                  Catatan Penolakan
                  <textarea
                    className="mt-1 w-full border rounded p-2"
                    rows={3}
                    value={verifyPayload.note || ""}
                    onChange={(e) =>
                      setVerifyPayload({
                        ...verifyPayload,
                        note: e.target.value,
                      })
                    }
                    placeholder="Alasan penolakan..."
                  />
                </label>
              )}
              <div className="text-sm text-gray-700 space-y-2">
                <div>
                  Nama: {(detailData?.candidate || profile)?.full_name || "-"}
                </div>
                <div>NIK: {(detailData?.candidate || profile)?.nik || "-"}</div>
                <div>
                  Tempat/Tgl Lahir:{" "}
                  {(detailData?.candidate || profile)?.place_of_birth || "-"} /{" "}
                  {String(
                    (detailData?.candidate || profile)?.birthdate || "",
                  ).slice(0, 10) || "-"}
                </div>
                <hr className="my-2" />
                <div>
                  KTP:{" "}
                  {detailData?.document?.ktp_file ? (
                    <a
                      href={detailData.document.ktp_file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div>
                  Ijazah:{" "}
                  {detailData?.document?.ijazah_file ? (
                    <a
                      href={detailData.document.ijazah_file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div>
                  Pas Foto:{" "}
                  {detailData?.document?.pas_photo_file ? (
                    <a
                      href={detailData.document.pas_photo_file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div>
                  Sertifikat:{" "}
                  {detailData?.document?.certificate_file ? (
                    <a
                      href={detailData.document.certificate_file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
                <div>
                  Kartu AK1:{" "}
                  {detailData?.document?.card_file ? (
                    <a
                      href={detailData.document.card_file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Unduh Kartu
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
