"use client";
import React, { useState, useTransition } from "react";
import { FormSignupvalueType } from "@/types";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { handleAuthSubmit } from "@/actions/authactions";
import {
  loginvalidations,
  signupvalidations,
} from "@/utils/validations/validation";
import { Spinner } from "@nextui-org/react";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [Loading, setLoading] = useState(false);
  const [ErrorInfo, setError] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });

  const [formType, setFormType] = useState<"login" | "signup">("login");
  const initialValue: FormSignupvalueType =
    formType === "login"
      ? {
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
          name: "",
          cpassword: "",
        };
  const handleServerAction = async (
    values: FormSignupvalueType | null,
    type: string
  ) => {
    try {
      if (formType === "signup") {
        if (type === "google" || type === "github") {
          const provider = new GoogleAuthProvider();
          const googleresponse = (await signInWithPopup(auth, provider)) as any;
          const createres = await handleAuthSubmit(
            {
              name: `${googleresponse?._tokenResponse?.firstName} ${googleresponse?._tokenResponse?.lastName}`,
              email:
                googleresponse?.user?.email ||
                googleresponse?._tokenResponse?.email,
              profilePic: googleresponse?._tokenResponse?.photoUrl,
              isGoogleLogin: true,
            },
            "credentials",
            formType
          );

          if (createres.isError) {
            setLoading(false);
            setError({ msg: createres.message, type: "cred" });
            return;
          }
          signIn("credentials", {
            redirect: true,
            username:
              googleresponse?.user?.email ||
              googleresponse?._tokenResponse?.email,
            password: "",
          })
            .then((data: any) => {
              if (data?.error) {
                setError({ msg: data.error, type: "cred" });
                setLoading(false);
              } else {
                console.log(
                  "🚀 ~ file: index.tsx ~ line 106 ~ LoginForm ~ data",
                  data
                );
                window.location.replace("/dashboard");
              }
            })
            .catch((er) => console.log(er));
        } else {
          const createres = await handleAuthSubmit(values, type, formType);
          if (createres.isError) {
            setLoading(false);
            setError({ msg: createres.message, type: "cred" });
            return;
          }
          signIn(type, {
            redirect: true,
            username: values?.email,
            password: values?.password,
          })
            .then((data: any) => {
              if (data?.error) {
                setError({ msg: data.error, type: "cred" });
                setLoading(false);
              } else {
                console.log(data);
                window.location.replace("/dashboard");
              }
            })
            .catch((er) => console.log(er));
        }
      } else {
        if (type === "google" || type === "github") {
          const provider = new GoogleAuthProvider();
          const googleresponse = await signInWithPopup(auth, provider);
          signIn("credentials", {
            redirect: false,
            username: googleresponse.user.email,
            password: "",
          })
            .then((data: any) => {
              if (data?.error !== null || data?.error) {
                setError({ msg: data.error, type: "cred" });
                setLoading(false);
              } else {
                window.location.replace("/dashboard");
              }
            })
            .catch((er) => console.log(er));
        } else {
          signIn(type, {
            redirect: false,
            username: values?.email?.trim(),
            password: values?.password?.trim(),
          })
            .then((data: any) => {
              if (data?.error) {
                setLoading(false);
                setError({ msg: data.error, type: "cred" });
              } else {
                console.log(data);

                window.location.replace("/dashboard");
              }
            })
            .catch((er) => console.log(er));
        }
      }
    } catch (error: any) {
      console.log("💕💕", "server Error", error);
      setLoading(false);
    }
  };
  const validation =
    formType === "login" ? loginvalidations : signupvalidations;
  const handleOtherClick = (type: string) => {
    setError({ type: "", msg: "" });
    setLoading(true);
    startTransition(() => handleServerAction(null, type));
  };
  return (
    <div className="form-container">
      <p className="title">{formType === "login" ? "Login" : "SignUp"}</p>
      {ErrorInfo.type === "cred" && (
        <p className="error-msg text-red-800 text-sm mb-0">{ErrorInfo.msg}</p>
      )}
      <Formik
        initialValues={initialValue}
        validationSchema={validation}
        onSubmit={(value: FormSignupvalueType) => {
          startTransition(() => handleServerAction(value, "credentials"));
        }}
      >
        {({ values, handleChange, errors }) => (
          <Form className="mt-2 form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={(e) => {
                  setError({ msg: "", type: "" });
                  handleChange(e);
                }}
                value={values.email}
                name="email"
                id="email"
                placeholder=""
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setError({ msg: "", type: "" });
                  handleChange(e);
                }}
                name="password"
                disabled={isPending || Loading}
                value={values.password}
                id="password"
                placeholder=""
              />
              {formType === "login" && (
                <div className="forgot">
                  <a rel="noopener noreferrer" href="#">
                    Forgot Password ?
                  </a>
                </div>
              )}
            </div>
            {formType !== "login" && (
              <div className="input-group mb-2">
                <label htmlFor="cpassword"> Confirm Password</label>
                <input
                  type="password"
                  value={values.cpassword}
                  disabled={isPending || Loading}
                  name="cpassword"
                  onChange={handleChange}
                  id="cpassword"
                  placeholder=""
                />
              </div>
            )}
            <button type="submit" className="sign">
              {isPending || Loading ? (
                <Spinner size="sm" />
              ) : formType === "login" ? (
                "Sign in"
              ) : (
                "SignUp"
              )}
            </button>
          </Form>
        )}
      </Formik>

      <div className="social-message">
        <div className="line"></div>
        <p className="message">
          {formType === "login" ? "Login" : "SignUp"} with social accounts
        </p>
        <div className="line" />
      </div>
      <div className="social-icons">
        <button
          aria-label="Log in with Google"
          onClick={(e) => handleOtherClick("google")}
          className="icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
        <button
          aria-label="Log in with GitHub"
          onClick={(e) => handleOtherClick("github")}
          className="icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
          </svg>
        </button>
      </div>
      <p className="signup">
        {formType === "login" ? "Dont have an account?" : "Already a member?"}
        <button
          className="cursor-pointer border-none bg-transparent text-white ms-2"
          onClick={() => {
            setError({ msg: "", type: "" });
            setFormType((prev) => (prev === "login" ? "signup" : "login"));
          }}
        >
          {formType === "login" ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
