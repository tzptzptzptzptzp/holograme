import { AppInitializer } from "@/components/templates/AppInitializer/AppInitializer.template";

export default async function VerifiedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppInitializer>{children}</AppInitializer>;
}
