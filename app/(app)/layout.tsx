import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getPresupuestos } from "../actions";
import { AppSidebar } from "@/components/app-sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPresupuestos();

  return (
    <main className="min-h-svh max-h-svh h-svh w-screen min-w-screen max-w-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar data={data} />
        <div className="w-full h-full relative">
          <div className="absolute top-0 left-0 z-50 h-12 flex items-center px-4">
            <SidebarTrigger />
          </div>
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
