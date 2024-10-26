import { LoginSchema } from "@/lib/types/login";
import { signIn } from "next-auth/react";

export async function socialLogin(formData: FormData) {
  const action = formData.get("action");
  await signIn(action as string, { redirectTo: "/dashboard" });
}

export async function credentialLogin(formData: LoginSchema) {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return response;
  } catch (error) {
    return { error: "Informasi login salah" };
  }
}
