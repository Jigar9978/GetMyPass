import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
    return (
      <div className="flex min-h-screen">
        <Sidebar/>
        <main>{children}</main>
      </div>
    );
  }