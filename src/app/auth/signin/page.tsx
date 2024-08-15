"use client";

import React, { useState } from "react";
import Logo from "@/images/logo.png";
import LogoDark from "@/images/logo-dark.png";
import AuthFooter from "./AuthFooter";

import { Form, Spinner, Alert, Button } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Icon from "@/components/icon/Icon";
import Link from "next/link";
import Image from "next/image";
import { authActions } from "@/server/actions";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const loginCredentials = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type loginSchema = z.input<typeof loginCredentials>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const router = useRouter();

  const onFormSubmit: SubmitHandler<loginSchema> = async (formData) => {
    setLoading(true);
    const response = await authActions.doCredentialsLogin(formData);
    setLoading(false);
    // jika berhasil login, redirect ke dashboard
    if (typeof response === "string") {
      router.push("/dashboard");
      return;
    }
    setError(response.error);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>();

  return (
    <>
      <div className="nk-block nk-block-middle nk-auth-body wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link href={process.env.PUBLIC_URL + "/"} className="logo-link">
            <Image
              className="logo-light logo-img logo-img-lg"
              src={Logo}
              alt="logo"
            />
            <Image
              className="logo-dark logo-img logo-img-lg"
              src={LogoDark}
              alt="logo-dark"
            />
          </Link>
        </div>

        <div className="card-preview card-bordered">
          <div className="card-inner card-inner-lg">
            <div className="nk-block-head">
              <div className="nk-block-content">
                <h5 className="nk-block-title page">Sign-In</h5>
                <div className="nk-block-des">
                  <p>Access Dashlite using your email and passcode.</p>
                </div>
              </div>
            </div>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon icon="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "This field is required",
                    })}
                    defaultValue="info@softnio.com"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.email && (
                    <span className="invalid">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <Link
                    className="link link-primary link-sm"
                    href={`/pages/auths/auth-reset`}
                  >
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <Link
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  >
                    <Icon icon="eye" className="passcode-icon icon-show"></Icon>
                    <Icon
                      icon="eye-off"
                      className="passcode-icon icon-hide"
                    ></Icon>
                  </Link>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "This field is required",
                    })}
                    defaultValue="123456"
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  />
                  {errors.password && (
                    <span className="invalid">{errors.password.message}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <Button
                  size="lg"
                  className="btn-block"
                  type="submit"
                  color="primary"
                >
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </div>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform?{" "}
              <Link
                href={`/pages/auths/auth-register`}
              >
                Create an account
              </Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-4">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};
export default Login;
