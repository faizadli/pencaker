"use client";
import { ZodIssue } from "zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Input,
  Textarea,
  SearchableSelect,
  TextEditor,
} from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import { presignUpload, presignDownload } from "../../../services/ak1";
import StatCard from "../../../components/ui/StatCard";
import Pagination from "../../../components/ui/Pagination";
import Card from "../../../components/ui/Card";
import {
  listSiteContents,
  upsertSiteContent,
  deleteSiteContent,
} from "../../../services/site";
import { useToast } from "../../../components/ui/Toast";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  faqSchema,
  partnerSchema,
  testimonialSchema,
  holidayGreetingSchema,
  richTextContentSchema,
  simpleContentSchema,
  teamMemberSchema,
} from "../../../utils/zod-schemas";

type SiteContentItem<T> = {
  id: string;
  data: T;
  status: "PUBLISHED" | "DRAFT";
};
type ListResponse<T> = { data: SiteContentItem<T>[] };

export default function KontenPage() {
  const [loading, setLoading] = useState(true);
  type Tab =
    | "faq"
    | "partners"
    | "testimonials"
    | "about"
    | "holiday_greetings";
  type AboutSection =
    | "about_profile"
    | "about_focus"
    | "about_mission"
    | "about_team"
    | "about_running_text"
    | "about_vision";
  type PubStatus = "Publikasi" | "Draft";
  type Faq = {
    id: string;
    pertanyaan: string;
    jawaban: string;
    kategori: string;
    status: "Publikasi" | "Draft";
  };
  type Partner = {
    id: string;
    name: string;
    logo: string;
    status: "Publikasi" | "Draft";
  };
  type Testimonial = {
    id: string;
    nama: string;
    pekerjaan: string;
    perusahaan: string;
    testimoni: string;
    foto: string;
    status: "Publikasi" | "Draft";
  };
  type HolidayGreeting = {
    id: string;
    title: string;
    description: string;
    image: string;
    status: "Publikasi" | "Draft";
  };
  type AboutFocus = { id: string; text: string; status: "Publikasi" | "Draft" };
  type AboutMission = {
    id: string;
    text: string;
    status: "Publikasi" | "Draft";
  };
  type TeamMember = {
    id: string;
    name: string;
    position: string;
    role: string;
    image: string;
    status: "Publikasi" | "Draft";
  };
  type RunningText = {
    id: string;
    text: string;
    status: "Publikasi" | "Draft";
  };

  const [activeTab, setActiveTab] = useState<Tab>("faq");
  const [contentModal, setContentModal] = useState<{
    section: "partners" | "testimonials" | "faqs" | "holiday_greetings";
    id?: string;
  } | null>(null);
  const [partnerLogoPreview, setPartnerLogoPreview] = useState<string>("");
  const [testimonialPhotoPreview, setTestimonialPhotoPreview] =
    useState<string>("");
  const [holidayGreetingImagePreview, setHolidayGreetingImagePreview] =
    useState<string>("");
  const [teamImagePreview, setTeamImagePreview] = useState<string>("");
  const [aboutModal, setAboutModal] = useState<{
    section:
      | "profile"
      | "focus_areas"
      | "mission_points"
      | "team"
      | "running_text"
      | "vision";
    id?: string;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editFaq, setEditFaq] = useState<Faq | null>(null);
  const [editPartner, setEditPartner] = useState<Partner | null>(null);
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(
    null,
  );
  const [editHolidayGreeting, setEditHolidayGreeting] =
    useState<HolidayGreeting | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileHtml, setProfileHtml] = useState<string>("");
  const [visionId, setVisionId] = useState<string | null>(null);
  const [visionHtml, setVisionHtml] = useState<string>("");
  const [editFocus, setEditFocus] = useState<AboutFocus | null>(null);
  const [editMission, setEditMission] = useState<AboutMission | null>(null);
  const [editTeam, setEditTeam] = useState<TeamMember | null>(null);
  const [editRunningText, setEditRunningText] = useState<RunningText | null>(
    null,
  );

  const [faqList, setFaqList] = useState<Faq[]>([]);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [holidayGreetingsList, setHolidayGreetingsList] = useState<
    HolidayGreeting[]
  >([]);
  const [focusList, setFocusList] = useState<AboutFocus[]>([]);
  const [missionsList, setMissionsList] = useState<AboutMission[]>([]);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [runningText, setRunningText] = useState<RunningText | null>(null);
  const { showSuccess, showError } = useToast();
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        try {
          const faqResp = (await listSiteContents({
            page: "home",
            section: "faqs",
            published: false,
          })) as ListResponse<{
            pertanyaan?: string;
            q?: string;
            jawaban?: string;
            a?: string;
            kategori?: string;
          }>;
          const rows = Array.isArray(faqResp.data) ? faqResp.data : [];
          setFaqList(
            rows.map(
              (
                r: SiteContentItem<{
                  pertanyaan?: string;
                  q?: string;
                  jawaban?: string;
                  a?: string;
                  kategori?: string;
                }>,
              ) => ({
                id: String(r.id),
                pertanyaan: String(r.data?.pertanyaan || r.data?.q || ""),
                jawaban: String(r.data?.jawaban || r.data?.a || ""),
                kategori: String(r.data?.kategori || "Umum"),
                status: String(
                  r.status === "PUBLISHED" ? "Publikasi" : "Draft",
                ) as Faq["status"],
              }),
            ),
          );
        } catch {}

        try {
          const partnersResp = (await listSiteContents({
            page: "home",
            section: "partners",
            published: false,
          })) as ListResponse<{ name?: string; logo?: string }>;
          const rows = Array.isArray(partnersResp.data)
            ? partnersResp.data
            : [];
          setPartnersList(
            rows.map(
              (r: SiteContentItem<{ name?: string; logo?: string }>) => ({
                id: String(r.id),
                name: String(r.data?.name || ""),
                logo: String(r.data?.logo || ""),
                status: String(
                  r.status === "PUBLISHED" ? "Publikasi" : "Draft",
                ) as Partner["status"],
              }),
            ),
          );
        } catch {}

        try {
          const testiResp = (await listSiteContents({
            page: "home",
            section: "testimonials",
            published: false,
          })) as ListResponse<{
            nama?: string;
            pekerjaan?: string;
            perusahaan?: string;
            testimoni?: string;
            foto?: string;
          }>;
          const rows = Array.isArray(testiResp.data) ? testiResp.data : [];
          setTestimonialsList(
            rows.map(
              (
                r: SiteContentItem<{
                  nama?: string;
                  pekerjaan?: string;
                  perusahaan?: string;
                  testimoni?: string;
                  foto?: string;
                }>,
              ) => ({
                id: String(r.id),
                nama: String(r.data?.nama || ""),
                pekerjaan: String(r.data?.pekerjaan || ""),
                perusahaan: String(r.data?.perusahaan || ""),
                testimoni: String(r.data?.testimoni || ""),
                foto: String(r.data?.foto || ""),
                status: String(
                  r.status === "PUBLISHED" ? "Publikasi" : "Draft",
                ) as Testimonial["status"],
              }),
            ),
          );
        } catch {}

        try {
          const hgResp = (await listSiteContents({
            page: "home",
            section: "holiday_greetings",
            published: false,
          })) as ListResponse<{
            title?: string;
            description?: string;
            image?: string;
          }>;
          const rows = Array.isArray(hgResp.data) ? hgResp.data : [];
          setHolidayGreetingsList(
            rows.map(
              (
                r: SiteContentItem<{
                  title?: string;
                  description?: string;
                  image?: string;
                }>,
              ) => ({
                id: String(r.id),
                title: String(r.data?.title || ""),
                description: String(r.data?.description || ""),
                image: String(r.data?.image || ""),
                status: String(
                  r.status === "PUBLISHED" ? "Publikasi" : "Draft",
                ) as HolidayGreeting["status"],
              }),
            ),
          );
        } catch {}

        try {
          const profileResp = (await listSiteContents({
            page: "about",
            section: "profile",
            published: false,
          })) as ListResponse<{ content_html?: string }>;
          const rows = Array.isArray(profileResp.data) ? profileResp.data : [];
          const first = rows[0];
          setProfileId(first ? String(first.id) : null);
          setProfileHtml(first ? String(first.data?.content_html || "") : "");
        } catch {}

        try {
          const visionResp = (await listSiteContents({
            page: "about",
            section: "vision",
            published: false,
          })) as ListResponse<{ content_html?: string }>;
          const rows = Array.isArray(visionResp.data) ? visionResp.data : [];
          const first = rows[0];
          setVisionId(first ? String(first.id) : null);
          setVisionHtml(first ? String(first.data?.content_html || "") : "");
        } catch {}

        try {
          const focusResp = (await listSiteContents({
            page: "about",
            section: "focus_areas",
            published: false,
          })) as ListResponse<{ text?: string }>;
          const rows = Array.isArray(focusResp.data) ? focusResp.data : [];
          setFocusList(
            rows.map((r: SiteContentItem<{ text?: string }>) => ({
              id: String(r.id),
              text: String(r.data?.text || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as AboutFocus["status"],
            })),
          );
        } catch {}

        try {
          const missionResp = (await listSiteContents({
            page: "about",
            section: "mission_points",
            published: false,
          })) as ListResponse<{ text?: string }>;
          const rows = Array.isArray(missionResp.data) ? missionResp.data : [];
          setMissionsList(
            rows.map((r: SiteContentItem<{ text?: string }>) => ({
              id: String(r.id),
              text: String(r.data?.text || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as AboutMission["status"],
            })),
          );
        } catch {}

        try {
          const teamResp = (await listSiteContents({
            page: "about",
            section: "team",
            published: false,
          })) as ListResponse<{
            name?: string;
            position?: string;
            role?: string;
            image?: string;
          }>;
          const rows = Array.isArray(teamResp.data) ? teamResp.data : [];
          setTeamList(
            rows.map(
              (
                r: SiteContentItem<{
                  name?: string;
                  position?: string;
                  role?: string;
                  image?: string;
                }>,
              ) => ({
                id: String(r.id),
                name: String(r.data?.name || ""),
                position: String(r.data?.position || ""),
                role: String(r.data?.role || ""),
                image: String(r.data?.image || ""),
                status: String(
                  r.status === "PUBLISHED" ? "Publikasi" : "Draft",
                ) as TeamMember["status"],
              }),
            ),
          );
        } catch {}

        try {
          const rtResp = (await listSiteContents({
            page: "home",
            section: "running_text",
            published: false,
          })) as ListResponse<{ text?: string }>;
          const rows = Array.isArray(rtResp.data) ? rtResp.data : [];
          const first = rows[0];
          setRunningText(
            first
              ? {
                  id: String(first.id),
                  text: String(first.data?.text || ""),
                  status: String(
                    first.status === "PUBLISHED" ? "Publikasi" : "Draft",
                  ) as RunningText["status"],
                }
              : null,
          );
        } catch {}
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = (section: Tab) => {
    if (section === "faq") {
      const item: Faq = {
        id: "__new__",
        pertanyaan: "",
        jawaban: "",
        kategori: "Umum",
        status: "Draft",
      };
      setEditFaq(item);
      setContentModal({ section: "faqs", id: "__new__" });
    } else if (section === "partners") {
      const item: Partner = {
        id: "__new__",
        name: "",
        logo: "",
        status: "Draft",
      };
      setEditPartner(item);
      setPartnerLogoPreview("");
      setContentModal({ section: "partners", id: "__new__" });
    } else if (section === "testimonials") {
      const item: Testimonial = {
        id: "__new__",
        nama: "",
        pekerjaan: "",
        perusahaan: "",
        testimoni: "",
        foto: "",
        status: "Draft",
      };
      setEditTestimonial(item);
      setTestimonialPhotoPreview("");
      setContentModal({ section: "testimonials", id: "__new__" });
    } else if (section === "holiday_greetings") {
      const item: HolidayGreeting = {
        id: "__new__",
        title: "",
        description: "",
        image: "",
        status: "Draft",
      };
      setEditHolidayGreeting(item);
      setHolidayGreetingImagePreview("");
      setContentModal({ section: "holiday_greetings", id: "__new__" });
    }
  };

  const handleEdit = (
    section: Tab,
    item: Faq | Partner | Testimonial | HolidayGreeting,
  ) => {
    if (section === "faq") {
      setEditFaq(item as Faq);
      setContentModal({ section: "faqs", id: String(item.id) });
    }
    if (section === "partners") {
      setEditPartner(item as Partner);
      setContentModal({ section: "partners", id: String(item.id) });
      try {
        const v = String((item as Partner).logo || "");
        if (v)
          presignDownload(v)
            .then((d) => setPartnerLogoPreview(d.url))
            .catch(() => {});
      } catch {}
    }
    if (section === "testimonials") {
      setEditTestimonial(item as Testimonial);
      setContentModal({ section: "testimonials", id: String(item.id) });
      try {
        const v = String((item as Testimonial).foto || "");
        if (v)
          presignDownload(v)
            .then((d) => setTestimonialPhotoPreview(d.url))
            .catch(() => {});
      } catch {}
    }
    if (section === "holiday_greetings") {
      setEditHolidayGreeting(item as HolidayGreeting);
      setContentModal({ section: "holiday_greetings", id: String(item.id) });
      try {
        const v = String((item as HolidayGreeting).image || "");
        if (v)
          presignDownload(v)
            .then((d) => setHolidayGreetingImagePreview(d.url))
            .catch(() => {});
      } catch {}
    }
  };

  const handleSave = async (section: Tab | AboutSection, id: string) => {
    const upsertId = id === "__new__" ? undefined : id;
    if (section === "faq" && editFaq) {
      setContentSubmitted(true);
      setFieldErrors({});

      const result = faqSchema.safeParse(editFaq);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err: ZodIssue) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setFieldErrors(newErrors);
        showError("Mohon periksa input anda");
        return;
      }

      setFaqList(
        faqList.map((item) => (item.id === id ? { ...editFaq } : item)),
      );
      try {
        await upsertSiteContent({
          id: upsertId,
          page: "home",
          section: "faqs",
          data: {
            pertanyaan: editFaq.pertanyaan,
            jawaban: editFaq.jawaban,
            kategori: editFaq.kategori,
          },
          status: editFaq.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const faqResp = (await listSiteContents({
          page: "home",
          section: "faqs",
          published: false,
        })) as ListResponse<{
          pertanyaan?: string;
          q?: string;
          jawaban?: string;
          a?: string;
          kategori?: string;
        }>;
        const rows = Array.isArray(faqResp.data) ? faqResp.data : [];
        setFaqList(
          rows.map(
            (
              r: SiteContentItem<{
                pertanyaan?: string;
                q?: string;
                jawaban?: string;
                a?: string;
                kategori?: string;
              }>,
            ) => ({
              id: String(r.id),
              pertanyaan: String(r.data?.pertanyaan || r.data?.q || ""),
              jawaban: String(r.data?.jawaban || r.data?.a || ""),
              kategori: String(r.data?.kategori || "Umum"),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Faq["status"],
            }),
          ),
        );
        showSuccess("FAQ disimpan");
      } catch {}
    } else if (section === "partners" && editPartner) {
      setContentSubmitted(true);
      setFieldErrors({});

      const result = partnerSchema.safeParse(editPartner);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err: ZodIssue) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setFieldErrors(newErrors);
        showError("Mohon periksa input anda");
        return;
      }

      try {
        await upsertSiteContent({
          id: upsertId,
          page: "home",
          section: "partners",
          data: { name: editPartner.name, logo: editPartner.logo },
          status: editPartner.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const partnersResp = (await listSiteContents({
          page: "home",
          section: "partners",
          published: false,
        })) as ListResponse<{ name?: string; logo?: string }>;
        const rows = Array.isArray(partnersResp.data) ? partnersResp.data : [];
        setPartnersList(
          rows.map((r: SiteContentItem<{ name?: string; logo?: string }>) => ({
            id: String(r.id),
            name: String(r.data?.name || ""),
            logo: String(r.data?.logo || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as Partner["status"],
          })),
        );
        showSuccess("Mitra disimpan");
      } catch {}
      setContentModal(null);
    } else if (section === "testimonials" && editTestimonial) {
      setContentSubmitted(true);
      setFieldErrors({});

      const result = testimonialSchema.safeParse(editTestimonial);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err: ZodIssue) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setFieldErrors(newErrors);
        showError("Mohon periksa input anda");
        return;
      }

      try {
        await upsertSiteContent({
          id: upsertId,
          page: "home",
          section: "testimonials",
          data: {
            nama: editTestimonial.nama,
            pekerjaan: editTestimonial.pekerjaan,
            perusahaan: editTestimonial.perusahaan,
            testimoni: editTestimonial.testimoni,
            foto: editTestimonial.foto,
          },
          status:
            editTestimonial.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const testiResp = (await listSiteContents({
          page: "home",
          section: "testimonials",
          published: false,
        })) as ListResponse<{
          nama?: string;
          pekerjaan?: string;
          perusahaan?: string;
          testimoni?: string;
          foto?: string;
        }>;
        const rows = Array.isArray(testiResp.data) ? testiResp.data : [];
        setTestimonialsList(
          rows.map(
            (
              r: SiteContentItem<{
                nama?: string;
                pekerjaan?: string;
                perusahaan?: string;
                testimoni?: string;
                foto?: string;
              }>,
            ) => ({
              id: String(r.id),
              nama: String(r.data?.nama || ""),
              pekerjaan: String(r.data?.pekerjaan || ""),
              perusahaan: String(r.data?.perusahaan || ""),
              testimoni: String(r.data?.testimoni || ""),
              foto: String(r.data?.foto || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Testimonial["status"],
            }),
          ),
        );
        showSuccess("Testimoni disimpan");
      } catch {}
      setContentModal(null);
    } else if (section === "holiday_greetings" && editHolidayGreeting) {
      setContentSubmitted(true);
      setFieldErrors({});

      const result = holidayGreetingSchema.safeParse(editHolidayGreeting);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setFieldErrors(newErrors);
        showError("Mohon periksa input anda");
        return;
      }

      try {
        await upsertSiteContent({
          id: upsertId,
          page: "home",
          section: "holiday_greetings",
          data: {
            title: editHolidayGreeting.title,
            description: editHolidayGreeting.description,
            image: editHolidayGreeting.image,
          },
          status:
            editHolidayGreeting.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const hgResp = (await listSiteContents({
          page: "home",
          section: "holiday_greetings",
          published: false,
        })) as ListResponse<{
          title?: string;
          description?: string;
          image?: string;
        }>;
        const rows = Array.isArray(hgResp.data) ? hgResp.data : [];
        setHolidayGreetingsList(
          rows.map(
            (
              r: SiteContentItem<{
                title?: string;
                description?: string;
                image?: string;
              }>,
            ) => ({
              id: String(r.id),
              title: String(r.data?.title || ""),
              description: String(r.data?.description || ""),
              image: String(r.data?.image || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as HolidayGreeting["status"],
            }),
          ),
        );
        showSuccess("Ucapan Hari Raya disimpan");
      } catch {}
      setContentModal(null);
    } else if (section === "about_profile") {
      setFieldErrors({});
      const result = richTextContentSchema.safeParse({ content: profileHtml });
      if (!result.success) {
        showError("Profil instansi wajib diisi");
        return;
      }
      try {
        await upsertSiteContent({
          id: profileId || upsertId,
          page: "about",
          section: "profile",
          data: { content_html: profileHtml },
          status: "PUBLISHED",
          sort_order: 0,
        });
        const profileResp = (await listSiteContents({
          page: "about",
          section: "profile",
          published: false,
        })) as ListResponse<{ content_html?: string }>;
        const rows = Array.isArray(profileResp.data) ? profileResp.data : [];
        const first = rows[0];
        setProfileId(first ? String(first.id) : null);
        setProfileHtml(first ? String(first.data?.content_html || "") : "");
        showSuccess("Profil disimpan");
      } catch {}
    } else if (section === "about_vision") {
      setFieldErrors({});
      const result = richTextContentSchema.safeParse({ content: visionHtml });
      if (!result.success) {
        showError("Visi wajib diisi");
        return;
      }
      try {
        await upsertSiteContent({
          id: visionId || upsertId,
          page: "about",
          section: "vision",
          data: { content_html: visionHtml },
          status: "PUBLISHED",
          sort_order: 0,
        });
        const visionResp = (await listSiteContents({
          page: "about",
          section: "vision",
          published: false,
        })) as ListResponse<{ content_html?: string }>;
        const rows = Array.isArray(visionResp.data) ? visionResp.data : [];
        const first = rows[0];
        setVisionId(first ? String(first.id) : null);
        setVisionHtml(first ? String(first.data?.content_html || "") : "");
        showSuccess("Visi disimpan");
      } catch {}
    } else if (section === "about_focus" && editFocus) {
      setFieldErrors({});
      const result = simpleContentSchema.safeParse(editFocus);
      if (!result.success) {
        showError("Teks fokus wajib diisi");
        return;
      }
      setFocusList(
        focusList.map((item) => (item.id === id ? { ...editFocus } : item)),
      );
      try {
        await upsertSiteContent({
          id: upsertId,
          page: "about",
          section: "focus_areas",
          data: { text: editFocus.text },
          status: editFocus.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const focusResp = (await listSiteContents({
          page: "about",
          section: "focus_areas",
          published: false,
        })) as ListResponse<{ text?: string }>;
        const rows = Array.isArray(focusResp.data) ? focusResp.data : [];
        setFocusList(
          rows.map((r: SiteContentItem<{ text?: string }>) => ({
            id: String(r.id),
            text: String(r.data?.text || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as AboutFocus["status"],
          })),
        );
        showSuccess("Fokus disimpan");
      } catch {}
    } else if (section === "about_mission" && editMission) {
      setFieldErrors({});
      const result = simpleContentSchema.safeParse(editMission);
      if (!result.success) {
        showError("Teks misi wajib diisi");
        return;
      }
      setMissionsList(
        missionsList.map((item) =>
          item.id === id ? { ...editMission } : item,
        ),
      );
      try {
        await upsertSiteContent({
          id: upsertId,
          page: "about",
          section: "mission_points",
          data: { text: editMission.text },
          status: editMission.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const missionResp = (await listSiteContents({
          page: "about",
          section: "mission_points",
          published: false,
        })) as ListResponse<{ text?: string }>;
        const rows = Array.isArray(missionResp.data) ? missionResp.data : [];
        setMissionsList(
          rows.map((r: SiteContentItem<{ text?: string }>) => ({
            id: String(r.id),
            text: String(r.data?.text || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as AboutMission["status"],
          })),
        );
        showSuccess("Misi disimpan");
      } catch {}
    } else if (section === "about_team" && editTeam) {
      setFieldErrors({});
      const result = teamMemberSchema.safeParse(editTeam);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setFieldErrors(newErrors);
        showError("Mohon periksa input anda");
        return;
      }
      setTeamList(
        teamList.map((item) => (item.id === id ? { ...editTeam } : item)),
      );
      try {
        await upsertSiteContent({
          id: upsertId,
          page: "about",
          section: "team",
          data: {
            name: editTeam.name,
            position: editTeam.position,
            role: editTeam.role,
            image: editTeam.image,
          },
          status: editTeam.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const teamResp = (await listSiteContents({
          page: "about",
          section: "team",
          published: false,
        })) as ListResponse<{
          name?: string;
          position?: string;
          role?: string;
          image?: string;
        }>;
        const rows = Array.isArray(teamResp.data) ? teamResp.data : [];
        setTeamList(
          rows.map(
            (
              r: SiteContentItem<{
                name?: string;
                position?: string;
                role?: string;
                image?: string;
              }>,
            ) => ({
              id: String(r.id),
              name: String(r.data?.name || ""),
              position: String(r.data?.position || ""),
              role: String(r.data?.role || ""),
              image: String(r.data?.image || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as TeamMember["status"],
            }),
          ),
        );
        showSuccess("Anggota tim disimpan");
      } catch {}
    } else if (section === "about_running_text" && editRunningText) {
      if (!String(editRunningText.text || "").trim()) {
        showError("Teks wajib diisi");
        return;
      }
      setRunningText({ ...editRunningText, status: "Publikasi" });
      try {
        await upsertSiteContent({
          id: upsertId,
          page: "home",
          section: "running_text",
          data: { text: editRunningText.text },
          status: "PUBLISHED",
          sort_order: 0,
        });
        const rtResp = (await listSiteContents({
          page: "home",
          section: "running_text",
          published: false,
        })) as ListResponse<{ text?: string }>;
        const rows = Array.isArray(rtResp.data) ? rtResp.data : [];
        const first = rows[0];
        setRunningText(
          first
            ? {
                id: String(first.id),
                text: String(first.data?.text || ""),
                status: "Publikasi",
              }
            : null,
        );
        showSuccess("Teks berjalan disimpan");
      } catch {}
    }

    setEditFaq(null);
    setEditPartner(null);
    setEditTestimonial(null);
    setEditHolidayGreeting(null);
    setEditFocus(null);
    setEditMission(null);
    setEditTeam(null);
    setContentSubmitted(false);
  };

  const uploadContentImage = async (
    section: "partners" | "testimonials" | "team" | "holiday_greetings",
    file: File,
  ) => {
    try {
      const folder =
        section === "partners"
          ? "site-contents/partners"
          : section === "testimonials"
            ? "site-contents/testimonials"
            : section === "holiday_greetings"
              ? "site-contents/holiday-greetings"
              : "site-contents/team";
      const { url, key, public_url } = await presignUpload(
        folder,
        file.name,
        file.type,
      );
      if (!url) throw new Error("URL presign tidak ditemukan");
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Gagal upload ke S3: " + res.statusText);

      if (section === "partners" && editPartner) {
        const saved = public_url || key;
        setEditPartner({ ...editPartner, logo: saved });
        try {
          const d = await presignDownload(saved);
          setPartnerLogoPreview(d.url);
        } catch {}
      }
      if (section === "testimonials" && editTestimonial) {
        const saved = public_url || key;
        setEditTestimonial({ ...editTestimonial, foto: saved });
        try {
          const d = await presignDownload(saved);
          setTestimonialPhotoPreview(d.url);
        } catch {}
      }
      if (section === "team" && editTeam) {
        const saved = public_url || key;
        setEditTeam({ ...editTeam, image: saved });
        try {
          const d = await presignDownload(saved);
          setTeamImagePreview(d.url);
        } catch {}
      }
      if (section === "holiday_greetings" && editHolidayGreeting) {
        const saved = public_url || key;
        setEditHolidayGreeting({ ...editHolidayGreeting, image: saved });
        try {
          const d = await presignDownload(saved);
          setHolidayGreetingImagePreview(d.url);
        } catch {}
      }
    } catch (e) {
      console.error("Upload error:", e);
      showError(
        "Gagal upload gambar: " + ((e as Error).message || "Unknown error"),
      );
    }
  };

  const handleDelete = async (section: Tab | AboutSection, id: string) => {
    try {
      const secMap: Record<Tab | AboutSection, string> = {
        faq: "faqs",
        partners: "partners",
        testimonials: "testimonials",
        about: "",
        about_profile: "profile",
        about_vision: "vision",
        about_focus: "focus_areas",
        about_mission: "mission_points",
        about_team: "team",
        about_running_text: "running_text",
        holiday_greetings: "holiday_greetings",
      };
      const sec = secMap[section];
      await deleteSiteContent(id, sec);
      showSuccess("Data dihapus");
    } catch {}
    if (section === "faq") {
      try {
        const faqResp = (await listSiteContents({
          page: "home",
          section: "faqs",
          published: false,
        })) as ListResponse<{
          pertanyaan?: string;
          q?: string;
          jawaban?: string;
          a?: string;
          kategori?: string;
        }>;
        const rows = Array.isArray(faqResp.data) ? faqResp.data : [];
        setFaqList(
          rows.map(
            (
              r: SiteContentItem<{
                pertanyaan?: string;
                q?: string;
                jawaban?: string;
                a?: string;
                kategori?: string;
              }>,
            ) => ({
              id: String(r.id),
              pertanyaan: String(r.data?.pertanyaan || r.data?.q || ""),
              jawaban: String(r.data?.jawaban || r.data?.a || ""),
              kategori: String(r.data?.kategori || "Umum"),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Faq["status"],
            }),
          ),
        );
      } catch {}
    } else if (section === "partners") {
      try {
        const partnersResp = (await listSiteContents({
          page: "home",
          section: "partners",
          published: false,
        })) as ListResponse<{ name?: string; logo?: string }>;
        const rows = Array.isArray(partnersResp.data) ? partnersResp.data : [];
        setPartnersList(
          rows.map((r: SiteContentItem<{ name?: string; logo?: string }>) => ({
            id: String(r.id),
            name: String(r.data?.name || ""),
            logo: String(r.data?.logo || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as Partner["status"],
          })),
        );
      } catch {}
    } else if (section === "testimonials") {
      try {
        const testiResp = (await listSiteContents({
          page: "home",
          section: "testimonials",
          published: false,
        })) as ListResponse<{
          nama?: string;
          pekerjaan?: string;
          perusahaan?: string;
          testimoni?: string;
          foto?: string;
        }>;
        const rows = Array.isArray(testiResp.data) ? testiResp.data : [];
        setTestimonialsList(
          rows.map(
            (
              r: SiteContentItem<{
                nama?: string;
                pekerjaan?: string;
                perusahaan?: string;
                testimoni?: string;
                foto?: string;
              }>,
            ) => ({
              id: String(r.id),
              nama: String(r.data?.nama || ""),
              pekerjaan: String(r.data?.pekerjaan || ""),
              perusahaan: String(r.data?.perusahaan || ""),
              testimoni: String(r.data?.testimoni || ""),
              foto: String(r.data?.foto || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Testimonial["status"],
            }),
          ),
        );
      } catch {}
    } else if (section === "holiday_greetings") {
      try {
        const hgResp = (await listSiteContents({
          page: "home",
          section: "holiday_greetings",
          published: false,
        })) as ListResponse<{
          title?: string;
          description?: string;
          image?: string;
        }>;
        const rows = Array.isArray(hgResp.data) ? hgResp.data : [];
        setHolidayGreetingsList(
          rows.map(
            (
              r: SiteContentItem<{
                title?: string;
                description?: string;
                image?: string;
              }>,
            ) => ({
              id: String(r.id),
              title: String(r.data?.title || ""),
              description: String(r.data?.description || ""),
              image: String(r.data?.image || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as HolidayGreeting["status"],
            }),
          ),
        );
      } catch {}
    } else if (section === "about_focus") {
      try {
        const focusResp = (await listSiteContents({
          page: "about",
          section: "focus_areas",
          published: false,
        })) as ListResponse<{ text?: string }>;
        const rows = Array.isArray(focusResp.data) ? focusResp.data : [];
        setFocusList(
          rows.map((r: SiteContentItem<{ text?: string }>) => ({
            id: String(r.id),
            text: String(r.data?.text || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as AboutFocus["status"],
          })),
        );
      } catch {}
    } else if (section === "about_mission") {
      try {
        const missionResp = (await listSiteContents({
          page: "about",
          section: "mission_points",
          published: false,
        })) as ListResponse<{ text?: string }>;
        const rows = Array.isArray(missionResp.data) ? missionResp.data : [];
        setMissionsList(
          rows.map((r: SiteContentItem<{ text?: string }>) => ({
            id: String(r.id),
            text: String(r.data?.text || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as AboutMission["status"],
          })),
        );
      } catch {}
    } else if (section === "about_team") {
      try {
        const teamResp = (await listSiteContents({
          page: "about",
          section: "team",
          published: false,
        })) as ListResponse<{
          name?: string;
          position?: string;
          role?: string;
          image?: string;
        }>;
        const rows = Array.isArray(teamResp.data) ? teamResp.data : [];
        setTeamList(
          rows.map(
            (
              r: SiteContentItem<{
                name?: string;
                position?: string;
                role?: string;
                image?: string;
              }>,
            ) => ({
              id: String(r.id),
              name: String(r.data?.name || ""),
              position: String(r.data?.position || ""),
              role: String(r.data?.role || ""),
              image: String(r.data?.image || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as TeamMember["status"],
            }),
          ),
        );
      } catch {}
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publikasi":
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Pendaftaran":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case "Pelatihan":
        return "bg-blue-100 text-blue-800";
      case "Event":
        return "bg-purple-100 text-purple-800";
      case "Informasi":
        return "bg-green-100 text-green-800";
      case "Administrasi":
        return "bg-orange-100 text-orange-800";
      case "Hukum":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
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
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Manajemen Konten Website
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola berita, FAQ, mitra, testimoni, dan halaman tentang
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="FAQ Terbit"
              value={faqList.filter((f) => f.status === "Publikasi").length}
              change=""
              color="var(--color-danger)"
              icon="ri-question-line"
            />
            <StatCard
              title="Mitra"
              value={partnersList.length}
              change=""
              color="var(--color-primary)"
              icon="ri-team-line"
            />
          </div>

          <Card className="mb-6">
            <div className="flex overflow-x-auto">
              {[
                { id: "faq", label: "❓ FAQ", icon: "ri-question-line" },
                { id: "partners", label: "🤝 Mitra", icon: "ri-team-line" },
                {
                  id: "testimonials",
                  label: "💬 Testimoni",
                  icon: "ri-chat-1-line",
                },
                {
                  id: "holiday_greetings",
                  label: "🎉 Ucapan",
                  icon: "ri-gift-line",
                },
                { id: "about", label: "📄 Tentang", icon: "ri-file-user-line" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    setPage(1);
                  }}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </Card>

          {activeTab === "holiday_greetings" && (
            <Card
              header={
                <h2 className="text-lg font-semibold text-primary">
                  Ucapan Hari Raya
                </h2>
              }
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  Daftar ucapan selamat (Lebaran, Natal, dll)
                </p>
                <button
                  onClick={() => handleAdd("holiday_greetings")}
                  className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                >
                  <i className="ri-add-line"></i> Tambah
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {holidayGreetingsList.map((h) => (
                  <div key={h.id} className="p-4 bg-white rounded-lg border">
                    <div className="relative w-full h-32 mb-3 bg-gray-100 rounded overflow-hidden">
                      {h.image ? (
                        <Image
                          src={h.image}
                          alt={h.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <i className="ri-image-line text-2xl"></i>
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-primary truncate">
                      {h.title}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(h.status)}`}
                      >
                        {h.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit("holiday_greetings", h)}
                          className="p-1.5 border rounded text-gray-600 hover:text-primary"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleDelete("holiday_greetings", h.id)
                          }
                          className="p-1.5 border rounded text-red-600 hover:text-red-800"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {holidayGreetingsList.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Belum ada ucapan hari raya
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === "about" && (
            <div className="space-y-6">
              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">Profil</h2>
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">
                    Konten HTML profil instansi
                  </p>
                  <button
                    onClick={() =>
                      setAboutModal({
                        section: "profile",
                        id: profileId || undefined,
                      })
                    }
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    <i className="ri-edit-line"></i> Edit
                  </button>
                </div>
                <div
                  className="prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: profileHtml || "" }}
                />
              </Card>

              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">Visi</h2>
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Konten HTML visi</p>
                  <button
                    onClick={() =>
                      setAboutModal({
                        section: "vision",
                        id: visionId || undefined,
                      })
                    }
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    <i className="ri-edit-line"></i> Edit
                  </button>
                </div>
                <div
                  className="prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: visionHtml || "" }}
                />
              </Card>

              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">Fokus</h2>
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Daftar area fokus</p>
                  <button
                    onClick={() => {
                      const item: AboutFocus = {
                        id: "__new__",
                        text: "",
                        status: "Draft",
                      };
                      setEditFocus(item);
                      setAboutModal({ section: "focus_areas", id: "__new__" });
                    }}
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    <i className="ri-add-line"></i> Tambah
                  </button>
                </div>
                <div className="space-y-3">
                  {focusList.map((f) => (
                    <div
                      key={f.id}
                      className="p-4 bg-white rounded-lg border flex justify-between items-start gap-3"
                    >
                      <div>
                        <p className="text-sm text-primary">{f.text}</p>
                        <span
                          className={`mt-2 inline-block px-2 py-1 rounded ${getStatusColor(f.status)}`}
                        >
                          {f.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditFocus(f);
                            setAboutModal({ section: "focus_areas", id: f.id });
                          }}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("about_focus", f.id)}
                          className="px-2 py-1 border rounded text-sm text-red-700"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">Misi</h2>
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Poin misi</p>
                  <button
                    onClick={() => {
                      const item: AboutMission = {
                        id: "__new__",
                        text: "",
                        status: "Draft",
                      };
                      setEditMission(item);
                      setAboutModal({
                        section: "mission_points",
                        id: "__new__",
                      });
                    }}
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    <i className="ri-add-line"></i> Tambah
                  </button>
                </div>
                <div className="space-y-3">
                  {missionsList.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 bg-white rounded-lg border flex justify-between items-start gap-3"
                    >
                      <div>
                        <p className="text-sm text-primary">{m.text}</p>
                        <span
                          className={`mt-2 inline-block px-2 py-1 rounded ${getStatusColor(m.status)}`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditMission(m);
                            setAboutModal({
                              section: "mission_points",
                              id: m.id,
                            });
                          }}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("about_mission", m.id)}
                          className="px-2 py-1 border rounded text-sm text-red-700"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">Tim</h2>
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Anggota tim</p>
                  <button
                    onClick={() => {
                      const item: TeamMember = {
                        id: "__new__",
                        name: "",
                        position: "",
                        role: "",
                        image: "",
                        status: "Draft",
                      };
                      setEditTeam(item);
                      setAboutModal({ section: "team", id: "__new__" });
                    }}
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    <i className="ri-add-line"></i> Tambah
                  </button>
                </div>
                <div className="space-y-3">
                  {teamList.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 bg-white rounded-lg border flex justify-between items-start gap-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {t.position} • {t.role}
                        </p>
                        <span
                          className={`mt-2 inline-block px-2 py-1 rounded ${getStatusColor(t.status)}`}
                        >
                          {t.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditTeam(t);
                            setAboutModal({ section: "team", id: t.id });
                          }}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("about_team", t.id)}
                          className="px-2 py-1 border rounded text-sm text-red-700"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                header={
                  <h2 className="text-lg font-semibold text-primary">
                    Teks Berjalan (Running Text)
                  </h2>
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">
                    Teks yang berjalan di halaman beranda
                  </p>
                  <button
                    onClick={() => {
                      const item: RunningText = runningText || {
                        id: "__new__",
                        text: "",
                        status: "Publikasi",
                      };
                      setEditRunningText(item);
                      setAboutModal({
                        section: "running_text",
                        id: item.id === "__new__" ? "__new__" : item.id,
                      });
                    }}
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    <i className="ri-edit-line"></i> Edit
                  </button>
                </div>
                {runningText ? (
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-sm text-primary">{runningText.text}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Belum ada teks berjalan.
                  </p>
                )}
              </Card>

              {aboutModal && (
                <Modal
                  open={true}
                  size={aboutModal.section === "profile" ? "xl" : "md"}
                  title={`${aboutModal.id === "__new__" ? "Tambah" : "Edit"} Tentang: ${aboutModal.section}`}
                  onClose={() => setAboutModal(null)}
                  actions={
                    <>
                      <button
                        onClick={() => {
                          if (aboutModal.section === "profile") {
                            handleSave(
                              "about_profile",
                              aboutModal.id || profileId || "__new__",
                            );
                          } else if (aboutModal.section === "vision") {
                            handleSave(
                              "about_vision",
                              aboutModal.id || visionId || "__new__",
                            );
                          } else if (
                            aboutModal.section === "focus_areas" &&
                            editFocus
                          ) {
                            handleSave(
                              "about_focus",
                              aboutModal.id || editFocus.id,
                            );
                          } else if (
                            aboutModal.section === "mission_points" &&
                            editMission
                          ) {
                            handleSave(
                              "about_mission",
                              aboutModal.id || editMission.id,
                            );
                          } else if (
                            aboutModal.section === "team" &&
                            editTeam
                          ) {
                            handleSave(
                              "about_team",
                              aboutModal.id || editTeam.id,
                            );
                          } else if (
                            aboutModal.section === "running_text" &&
                            editRunningText
                          ) {
                            handleSave(
                              "about_running_text",
                              aboutModal.id || editRunningText.id,
                            );
                          }
                          setAboutModal(null);
                        }}
                        className="px-3 py-2 bg-primary text-white rounded-lg"
                      >
                        <i className="ri-check-line"></i> Simpan
                      </button>
                      <button
                        onClick={() => setAboutModal(null)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        Batal
                      </button>
                    </>
                  }
                >
                  {aboutModal.section === "profile" && (
                    <TextEditor
                      value={profileHtml}
                      onChange={(v) => setProfileHtml(v)}
                      placeholder="Tulis profil instansi..."
                      error={fieldErrors.content_html}
                    />
                  )}
                  {aboutModal.section === "vision" && (
                    <TextEditor
                      value={visionHtml}
                      onChange={(v) => setVisionHtml(v)}
                      placeholder="Tulis visi..."
                      error={fieldErrors.content_html}
                    />
                  )}
                  {aboutModal.section === "focus_areas" && editFocus && (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        value={editFocus.text}
                        onChange={(e) =>
                          setEditFocus((prev) =>
                            prev ? { ...prev, text: e.target.value } : prev,
                          )
                        }
                        className="w-full"
                        error={fieldErrors.text}
                      />
                      <SearchableSelect
                        value={editFocus.status}
                        onChange={(v) =>
                          setEditFocus((prev) =>
                            prev ? { ...prev, status: v as PubStatus } : prev,
                          )
                        }
                        options={[
                          { value: "Draft", label: "Draft" },
                          { value: "Publikasi", label: "Publikasi" },
                        ]}
                        error={fieldErrors.status}
                      />
                    </div>
                  )}
                  {aboutModal.section === "mission_points" && editMission && (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        value={editMission.text}
                        onChange={(e) =>
                          setEditMission((prev) =>
                            prev ? { ...prev, text: e.target.value } : prev,
                          )
                        }
                        className="w-full"
                        error={fieldErrors.text}
                      />
                      <SearchableSelect
                        value={editMission.status}
                        onChange={(v) =>
                          setEditMission((prev) =>
                            prev ? { ...prev, status: v as PubStatus } : prev,
                          )
                        }
                        options={[
                          { value: "Draft", label: "Draft" },
                          { value: "Publikasi", label: "Publikasi" },
                        ]}
                        error={fieldErrors.status}
                      />
                    </div>
                  )}
                  {aboutModal.section === "running_text" && editRunningText && (
                    <div className="space-y-3">
                      <Textarea
                        value={editRunningText.text}
                        onChange={(e) =>
                          setEditRunningText((prev) =>
                            prev ? { ...prev, text: e.target.value } : prev,
                          )
                        }
                        placeholder="Teks"
                        className="w-full"
                        rows={4}
                        error={fieldErrors.text}
                      />
                    </div>
                  )}
                  {aboutModal.section === "team" && editTeam && (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        value={editTeam.name}
                        onChange={(e) =>
                          setEditTeam((prev) =>
                            prev ? { ...prev, name: e.target.value } : prev,
                          )
                        }
                        className="w-full"
                        error={fieldErrors.name}
                      />
                      <Input
                        type="text"
                        value={editTeam.position}
                        onChange={(e) =>
                          setEditTeam((prev) =>
                            prev ? { ...prev, position: e.target.value } : prev,
                          )
                        }
                        className="w-full"
                        error={fieldErrors.position}
                      />
                      <Input
                        type="text"
                        value={editTeam.role}
                        onChange={(e) =>
                          setEditTeam((prev) =>
                            prev ? { ...prev, role: e.target.value } : prev,
                          )
                        }
                        className="w-full"
                        error={fieldErrors.role}
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        label="Foto Anggota"
                        onChange={(e) => {
                          const f = (e.target as HTMLInputElement).files?.[0];
                          if (f) uploadContentImage("team", f);
                        }}
                        error={fieldErrors.image}
                      />
                      {teamImagePreview && (
                        <Image
                          src={teamImagePreview}
                          alt="Foto Anggota"
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover border rounded"
                        />
                      )}
                      <SearchableSelect
                        value={editTeam.status}
                        onChange={(v) =>
                          setEditTeam((prev) =>
                            prev ? { ...prev, status: v as PubStatus } : prev,
                          )
                        }
                        options={[
                          { value: "Draft", label: "Draft" },
                          { value: "Publikasi", label: "Publikasi" },
                        ]}
                        error={fieldErrors.status}
                      />
                    </div>
                  )}
                </Modal>
              )}
            </div>
          )}

          {activeTab === "partners" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">Mitra</h2>
                <button
                  onClick={() => handleAdd("partners")}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center gap-2"
                >
                  <i className="ri-add-line"></i>
                  Tambah Mitra
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partnersList
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize,
                  )
                  .map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary text-lg">
                              {p.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-3">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(p.status)}`}
                              >
                                {p.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                              {p.logo}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit("partners", p)}
                              className="px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition flex items-center gap-1"
                            >
                              <i className="ri-edit-line"></i>Edit
                            </button>
                            <button
                              onClick={() => handleDelete("partners", p.id)}
                              className="px-3 py-2 text-sm border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
                            >
                              <i className="ri-delete-bin-line"></i>Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">
                  Testimoni
                </h2>
                <button
                  onClick={() => handleAdd("testimonials")}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center gap-2"
                >
                  <i className="ri-add-line"></i>Tambah Testimoni
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonialsList
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize,
                  )
                  .map((t) => (
                    <div
                      key={t.id}
                      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary text-lg">
                              {t.nama}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {t.pekerjaan} • {t.perusahaan}
                            </p>
                            <p className="text-sm text-gray-500 mt-3">
                              {t.testimoni}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(t.status)}`}
                              >
                                {t.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit("testimonials", t)}
                              className="px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition flex items-center gap-1"
                            >
                              <i className="ri-edit-line"></i>Edit
                            </button>
                            <button
                              onClick={() => handleDelete("testimonials", t.id)}
                              className="px-3 py-2 text-sm border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
                            >
                              <i className="ri-delete-bin-line"></i>Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {contentModal && (
            <Modal
              open={true}
              size="md"
              title={`${contentModal.id === "__new__" ? "Tambah" : "Edit"} ${contentModal.section === "partners" ? "Mitra" : contentModal.section === "testimonials" ? "Testimoni" : contentModal.section === "faqs" ? "FAQ" : "Ucapan Hari Raya"}`}
              onClose={() => setContentModal(null)}
              actions={
                <>
                  <button
                    onClick={() => {
                      setContentSubmitted(true);
                      if (contentModal.section === "partners" && editPartner) {
                        handleSave(
                          "partners",
                          contentModal.id || editPartner.id,
                        );
                      } else if (
                        contentModal.section === "testimonials" &&
                        editTestimonial
                      ) {
                        handleSave(
                          "testimonials",
                          contentModal.id || editTestimonial.id,
                        );
                      } else if (contentModal.section === "faqs" && editFaq) {
                        handleSave("faq", contentModal.id || editFaq.id);
                      } else if (
                        contentModal.section === "holiday_greetings" &&
                        editHolidayGreeting
                      ) {
                        handleSave(
                          "holiday_greetings",
                          contentModal.id || editHolidayGreeting.id,
                        );
                      }
                      setContentModal(null);
                    }}
                    className="px-3 py-2 bg-primary text-white rounded-lg"
                  >
                    <i className="ri-check-line"></i> Simpan
                  </button>
                  <button
                    onClick={() => setContentModal(null)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    Batal
                  </button>
                </>
              }
            >
              {contentModal.section === "partners" && editPartner && (
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={editPartner.name}
                    onChange={(e) =>
                      setEditPartner({ ...editPartner, name: e.target.value })
                    }
                    placeholder="Nama mitra"
                    className="w-full"
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.name}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    label="Logo Mitra"
                    onChange={(e) => {
                      const f = (e.target as HTMLInputElement).files?.[0];
                      if (f) uploadContentImage("partners", f);
                    }}
                    error={fieldErrors.logo}
                  />
                  {partnerLogoPreview && (
                    <Image
                      src={partnerLogoPreview}
                      alt="Logo Mitra"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-contain border rounded"
                    />
                  )}
                  <SearchableSelect
                    value={editPartner.status}
                    onChange={(v) =>
                      setEditPartner({
                        ...editPartner,
                        status: v as Partner["status"],
                      })
                    }
                    options={[
                      { value: "Draft", label: "Draft" },
                      { value: "Publikasi", label: "Publikasi" },
                    ]}
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.status}
                  />
                </div>
              )}
              {contentModal.section === "testimonials" && editTestimonial && (
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={editTestimonial.nama}
                    onChange={(e) =>
                      setEditTestimonial({
                        ...editTestimonial,
                        nama: e.target.value,
                      })
                    }
                    placeholder="Nama"
                    className="w-full"
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.nama}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      type="text"
                      value={editTestimonial.pekerjaan}
                      onChange={(e) =>
                        setEditTestimonial({
                          ...editTestimonial,
                          pekerjaan: e.target.value,
                        })
                      }
                      placeholder="Pekerjaan"
                      error={fieldErrors.pekerjaan}
                    />
                    <Input
                      type="text"
                      value={editTestimonial.perusahaan}
                      onChange={(e) =>
                        setEditTestimonial({
                          ...editTestimonial,
                          perusahaan: e.target.value,
                        })
                      }
                      placeholder="Perusahaan"
                      error={fieldErrors.perusahaan}
                    />
                  </div>
                  <Textarea
                    value={editTestimonial.testimoni}
                    onChange={(e) =>
                      setEditTestimonial({
                        ...editTestimonial,
                        testimoni: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Testimoni"
                    className="w-full"
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.testimoni}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    label="Foto Testimoni"
                    onChange={(e) => {
                      const f = (e.target as HTMLInputElement).files?.[0];
                      if (f) uploadContentImage("testimonials", f);
                    }}
                    error={fieldErrors.foto}
                  />
                  {testimonialPhotoPreview && (
                    <Image
                      src={testimonialPhotoPreview}
                      alt="Foto"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover border rounded"
                    />
                  )}
                  <SearchableSelect
                    value={editTestimonial.status}
                    onChange={(v) =>
                      setEditTestimonial({
                        ...editTestimonial,
                        status: v as Testimonial["status"],
                      })
                    }
                    options={[
                      { value: "Draft", label: "Draft" },
                      { value: "Publikasi", label: "Publikasi" },
                    ]}
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.status}
                  />
                </div>
              )}
              {contentModal.section === "faqs" && editFaq && (
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={editFaq.pertanyaan}
                    onChange={(e) =>
                      setEditFaq({
                        ...(editFaq as Faq),
                        pertanyaan: e.target.value,
                      })
                    }
                    placeholder="Pertanyaan"
                    className="w-full"
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.pertanyaan}
                  />
                  <Textarea
                    value={editFaq.jawaban}
                    onChange={(e) =>
                      setEditFaq({
                        ...(editFaq as Faq),
                        jawaban: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Jawaban"
                    className="w-full"
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.jawaban}
                  />
                  <SearchableSelect
                    value={editFaq.status}
                    onChange={(v) =>
                      setEditFaq({
                        ...(editFaq as Faq),
                        status: v as Faq["status"],
                      })
                    }
                    options={[
                      { value: "Draft", label: "Draft" },
                      { value: "Publikasi", label: "Publikasi" },
                    ]}
                    required
                    submitted={contentSubmitted}
                    error={fieldErrors.status}
                  />
                </div>
              )}
              {contentModal.section === "holiday_greetings" &&
                editHolidayGreeting && (
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={editHolidayGreeting.title}
                      onChange={(e) =>
                        setEditHolidayGreeting({
                          ...(editHolidayGreeting as HolidayGreeting),
                          title: e.target.value,
                        })
                      }
                      placeholder="Judul Ucapan"
                      className="w-full"
                      required
                      submitted={contentSubmitted}
                      error={fieldErrors.title}
                    />
                    <Textarea
                      value={editHolidayGreeting.description}
                      onChange={(e) =>
                        setEditHolidayGreeting({
                          ...(editHolidayGreeting as HolidayGreeting),
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Deskripsi"
                      className="w-full"
                      error={fieldErrors.description}
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      label="Gambar Ucapan"
                      onChange={(e) => {
                        const f = (e.target as HTMLInputElement).files?.[0];
                        if (f) uploadContentImage("holiday_greetings", f);
                      }}
                      error={fieldErrors.image}
                    />
                    {holidayGreetingImagePreview && (
                      <Image
                        src={holidayGreetingImagePreview}
                        alt="Preview"
                        width={96}
                        height={96}
                        className="w-full h-40 object-cover border rounded"
                      />
                    )}
                    <SearchableSelect
                      value={editHolidayGreeting.status}
                      onChange={(v) =>
                        setEditHolidayGreeting({
                          ...(editHolidayGreeting as HolidayGreeting),
                          status: v as HolidayGreeting["status"],
                        })
                      }
                      options={[
                        { value: "Draft", label: "Draft" },
                        { value: "Publikasi", label: "Publikasi" },
                      ]}
                      required
                      submitted={contentSubmitted}
                      error={fieldErrors.status}
                    />
                  </div>
                )}
            </Modal>
          )}

          {activeTab === "faq" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">
                  FAQ (Pertanyaan Umum)
                </h2>
                <button
                  onClick={() => handleAdd("faq")}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center gap-2"
                >
                  <i className="ri-add-line"></i>
                  Tambah FAQ
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqList
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize,
                  )
                  .map((f) => (
                    <div
                      key={f.id}
                      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary text-lg">
                              {f.pertanyaan}
                            </h3>
                            <p className="text-sm text-gray-500 mt-3">
                              {f.jawaban}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getKategoriColor(f.kategori)}`}
                              >
                                {f.kategori}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(f.status)}`}
                              >
                                {f.status}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleEdit("faq", f)}
                            className="px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition flex items-center gap-1"
                          >
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("faq", f.id)}
                            className="px-3 py-2 text-sm border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
                          >
                            <i className="ri-delete-bin-line"></i>Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={
                activeTab === "faq"
                  ? faqList.length
                  : activeTab === "partners"
                    ? partnersList.length
                    : activeTab === "testimonials"
                      ? testimonialsList.length
                      : activeTab === "holiday_greetings"
                        ? holidayGreetingsList.length
                        : 1
              }
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
