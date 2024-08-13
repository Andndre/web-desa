import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Desa",
  description: "Web Desa untuk desa",
};

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold">Landing page.</h1>
      <a href="/dashboard" className="underline">
        Pergi ke dashboard
      </a>
    </>
  );
}
