import { Layout as LayoutComponent } from "@/lib/components/layout/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutComponent>{children}</LayoutComponent>;
}
