import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Signin from "@/components/Svgs/Signin";
import Form from "./form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Masuk ke Akun",
  description: "Masuk ke akun Web Desa",
};

const SignIn = async () => {
  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={"/images/logo/logo.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/logo-dark.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>

            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>

            <span className="mt-15 inline-block">
              <Signin />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Selamat datang,</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Masuk ke Web Desa
            </h2>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
