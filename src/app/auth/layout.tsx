import { auth } from "@/auth";
import { Layout } from "@/layout/auth";
import { redirect } from "next/navigation";

export default async function ({ children }: { children: React.ReactNode }) {
  // const session = await auth()

  // if (session) {
  //   redirect("/dashboard")
  // }

  return <Layout>{children}</Layout>;
}
