"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  await signIn(action as string, { redirectTo: "/dashboard" });
}

export async function doCredentialsLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
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
