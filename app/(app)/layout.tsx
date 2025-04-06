import { getPresupuestos } from "../actions";
import AppLayoutClient from "./layout.client";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPresupuestos();

  return (
    <AppLayoutClient data={data}>
      {children}
    </AppLayoutClient>
  );
}
