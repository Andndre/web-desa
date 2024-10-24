"use server";

import { LoginSchema } from "@/app/auth/signin/page";
import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  await signIn(action as string, { redirectTo: "/dashboard" });
}

export async function doCredentialsLogin(formData: LoginSchema) {
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

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
