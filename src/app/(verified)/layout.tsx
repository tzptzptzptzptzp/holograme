import { GlobalFetch } from "@/utils/GlobalFetch.util";
import { AppInitializer } from "@/components/templates/AppInitializer/AppInitializer.template";

export default async function VerifiedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await GlobalFetch();
  return <AppInitializer globalData={globalData}>{children}</AppInitializer>;
}
