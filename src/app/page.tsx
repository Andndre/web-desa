import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Desa",
  description: "Web Desa untuk desa",
};

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold">Landing page.</h1>
      <Link href="/dashboard" className="underline">
        Pergi ke dashboard
      </Link>
    </>
  );
}
