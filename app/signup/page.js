"use client";

import AuthForm from "@/components/AuthForm";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { signupUser } from "@/services/authService";
import { useEffect } from "react";

export default function SignupPage() {
  const { login, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const onSubmit = async ({ name, email, password }) => {
    const res = await signupUser(name, email, password);
    login(res.token, res.user);
    router.push("/");
  };

  return <AuthForm type="signup" onSubmit={onSubmit} />;
}
