"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar, { SidebarData } from "../../components/layout/Sidebar";
import ToastProvider from "../../components/ui/Toast";
import FullPageLoading from "../../components/ui/FullPageLoading";
import SessionInvalidatedModal from "../../components/ui/SessionInvalidatedModal";
import {
  getUserById,
  getCandidateProfile,
  getCompanyProfile,
  getDisnakerProfile,
} from "../../services/profile";
import { listRoles, getRolePermissions } from "../../services/rbac";
import { getPublicSiteSettings } from "../../services/site";
import { validateAdminSession } from "../../services/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [role] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [sidebarData, setSidebarData] = useState<SidebarData | undefined>(
    undefined,
  );
  const [showInvalidatedModal, setShowInvalidatedModal] = useState(false);

  // Session validation polling for admin roles
  useEffect(() => {
    const storedRole =
      typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";

    // Only poll for admin roles
    if (storedRole !== "super_admin" && storedRole !== "disnaker") {
      return;
    }

    const validateSession = async () => {
      const result = await validateAdminSession();
      if (!result.valid && result.code === "SESSION_INVALIDATED") {
        // Clear local auth and show modal
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("user_id");
        if (typeof document !== "undefined") {
          document.cookie = `sessionToken=; path=/; max-age=0`;
          document.cookie = `role=; path=/; max-age=0`;
        }
        setShowInvalidatedModal(true);
      }
    };

    // Initial check after 2 seconds
    const initialTimeout = setTimeout(validateSession, 2000);

    // Poll every 30 seconds
    const interval = setInterval(validateSession, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleCloseInvalidatedModal = () => {
    setShowInvalidatedModal(false);
    router.replace("/login/admin");
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    const uid =
      typeof window !== "undefined"
        ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
        : "";
    const storedRole =
      typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";

    (async () => {
      if (token && uid) {
        try {
          await getUserById(uid);

          // Prepare sidebar data
          let perms: string[] = [];
          let brandData = { name: "ADIKARA", logo: "" };
          let userData = { name: "", avatar: "", approved: false };

          const [rolesResp, siteSettingsResp, profileResp] =
            await Promise.allSettled([
              listRoles(),
              getPublicSiteSettings(),
              (async () => {
                if (storedRole === "company") return getCompanyProfile(uid);
                if (storedRole === "candidate") return getCandidateProfile(uid);
                return getDisnakerProfile(uid);
              })(),
            ]);

          // Process Roles & Permissions
          if (rolesResp.status === "fulfilled") {
            const roleItems = (rolesResp.value.data || rolesResp.value) as {
              id: number;
              name: string;
            }[];
            const target = roleItems.find(
              (x) =>
                String(x.name).toLowerCase() ===
                String(storedRole).toLowerCase(),
            );
            if (target) {
              try {
                const p = await getRolePermissions(target.id);
                const rows = (p.data || p) as { code: string; label: string }[];
                perms = rows.map((r) => r.code);
              } catch {}
            }
          }

          // Process Brand
          if (siteSettingsResp.status === "fulfilled") {
            const s = siteSettingsResp.value;
            const cfg =
              (
                s as {
                  data?: { instansi_nama?: string; instansi_logo?: string };
                }
              ).data ??
              (s as { instansi_nama?: string; instansi_logo?: string });
            brandData = {
              name: String(cfg?.instansi_nama || "ADIKARA"),
              logo: String(cfg?.instansi_logo || ""),
            };
          }

          // Process Profile
          if (profileResp.status === "fulfilled" && profileResp.value) {
            const d = (profileResp.value.data || {}) as unknown;
            const dataObj = d as Record<string, unknown>;
            if (storedRole === "company") {
              const raw = String(dataObj.status || "").toLowerCase();
              const approved =
                Boolean(dataObj.disnaker_id) ||
                ["approved", "terverifikasi", "disetujui"].includes(raw);
              userData = {
                name: String(dataObj.company_name || ""),
                avatar: String(dataObj.company_logo || ""),
                approved,
              };
              if (typeof document !== "undefined") {
                document.cookie = `companyApproved=${approved ? "true" : "false"}; path=/; max-age=1800`;
              }
            } else {
              userData = {
                name: String(dataObj.full_name || ""),
                avatar: String(dataObj.photo_profile || ""),
                approved: false,
              };
            }
          }

          setSidebarData({
            user: userData,
            permissions: perms,
            brand: brandData,
          });
          setCheckingSession(false);
          return;
        } catch {
          localStorage.removeItem("token");
        }
      }
      router.replace("/");
    })();
  }, [router]);

  if (checkingSession || !sidebarData) return <FullPageLoading />;

  return (
    <>
      <Sidebar roleProp={role} data={sidebarData} />
      <div className="fixed inset-0 bg-white -z-10"></div>
      <ToastProvider>
        <div className="px-4 sm:px-6">{children}</div>
      </ToastProvider>

      <SessionInvalidatedModal
        isOpen={showInvalidatedModal}
        onClose={handleCloseInvalidatedModal}
      />
    </>
  );
}
