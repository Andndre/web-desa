import { Providers } from "./providers";
import "@/assets/scss/dashlite.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="id">
        <body suppressHydrationWarning={true}>{children}</body>
      </html>
    </Providers>
  );
}
