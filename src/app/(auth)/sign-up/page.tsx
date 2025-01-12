"use client"

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const Page = () => (
  <AuthForm
    type="SIGN_Up"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={() => {}}
  />
);

export default Page;