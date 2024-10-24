"use client";

import React, { useState } from "react";
import Logo from "@/images/logo.png";
import LogoDark from "@/images/logo-dark.png";
import Footer from "./footer";

import { Form, Spinner, Alert, Button } from "reactstrap";
import Icon from "@/components/icon/Icon";
import Link from "next/link";
import Image from "next/image";
import { credentialLogin, socialLogin } from "@/actions/auth/login";
import { useFormSubmit } from "@/hooks/form";
import { LoginSchema } from "@/types/login";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    loading,
    register,
    handleSubmit,
    errorValue,
    formState: { errors },
  } = useFormSubmit<LoginSchema>(async (data, setError) => {
    const result = await credentialLogin(data);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  });

  return (
    <>
      <div className="nk-block nk-block-middle nk-auth-body wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link href={"/"} legacyBehavior>
            <div className="logo-link">
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
            </div>
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
            {errorValue && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorValue}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit()}>
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
                  {/* <Link
                    className="link link-primary link-sm"
                    href={`/pages/auths/auth-reset`}
                  >
                    Forgot Code?
                  </Link> */}
                </div>
                <div className="form-control-wrap">
                  <Link
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPasswordShown(!passwordShown);
                    }}
                    legacyBehavior
                  >
                    <div
                      className={`form-icon lg form-icon-right passcode-switch ${
                        passwordShown ? "is-hidden" : "is-shown"
                      }`}
                    >
                      <Icon
                        icon="eye"
                        className="passcode-icon icon-show"
                      ></Icon>
                      <Icon
                        icon="eye-off"
                        className="passcode-icon icon-hide"
                      ></Icon>
                    </div>
                  </Link>
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "This field is required",
                    })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${
                      passwordShown ? "is-hidden" : "is-shown"
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
            {/* <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform?{" "}
              <Link href={`/pages/auths/auth-register`}>Create an account</Link>
            </div> */}
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-4">
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </Link>
              </li> */}
              <form action={socialLogin} className="nav-item">
                <button
                  name="action"
                  value="google"
                  className="nav-link"
                  type="submit"
                >
                  Google
                </button>
              </form>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
