"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  );
}
