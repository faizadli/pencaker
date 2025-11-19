import { headers } from "next/headers";
import Sidebar from "../../components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieHeader = (await headers()).get("cookie") || "";
  let roleCookie = "";
  for (const part of cookieHeader.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === "role") {
      roleCookie = rest.join("=");
      break;
    }
  }

  return (
    <>
      <Sidebar roleProp={roleCookie} />
      <div className="fixed inset-0 bg-white -z-10"></div>
      {children}
    </>
  );
}