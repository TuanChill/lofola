"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/Controls";
import "./index.css";
import Button from "@/components/Button";
import { toast } from "sonner";
import { Toaster } from "@/components/Toast";


const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
        console.log(values);
      // validate form
      UserSchema.validate(values, { abortEarly: false })
        .then((valid) => {
          toast.success("Tuấn đang làm tiếp", {
            duration: 5000,
          })
        })
        .catch((err) => {
          if (!err.inner.length) return;

          const errors = err.inner as Yup.ValidationError[];
          // push err into errMessages
          errors.forEach((error) => {
            if (!error.message || !error.path) return;

              toast.error(error.message, {
                duration: 5000,
              });
          });
        });
    },
  });

  return (
    <>
    
            <Toaster richColors  />
    <div className="wrapper">
      <div className="login">
        <h2 className="title">Lofola</h2>
        <div className="des">
          <p>
            Welcome back, you&apos;ve <br /> been missed!
          </p>
        </div>
        <form>
          <div className="group">
            <Input
              type="text"
              placeholder="Enter email"
              className="w-full h-full"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="group">
            <Input
              type={passwordVisible ? "text" : "password"}
              className="w-full h-full"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span id="showPassword" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </form>
        <div className="text-sm flex justify-end mb-7 text-red-500">
          <a href="">Forgot Password?</a>
        </div>
        <div className="signIn">
          <Button className="justify-center" type="submit" onClick={() => formik.handleSubmit()} title="Sign In" />
        </div>
        <div className="text-sm">
          Not a member?{" "}
          <a className="underline text-blue-400" href="">
            {" "}
            Register now
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
