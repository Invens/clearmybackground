"use client";

import AuthForm from "@/components/AuthForm";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const onSubmit = async ({ email, password }) => {
    const res = await loginUser(email, password);
    login(res.token, res.user);
    router.push("/");
  };

  return <AuthForm type="login" onSubmit={onSubmit} />;
}
