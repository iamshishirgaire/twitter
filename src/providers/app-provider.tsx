import { env } from "@/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../components/theme-provider";
import QueryProvider from "./query-provider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default AppProvider;
