"use client";
import { useAuthStore } from "@/store/auth.store";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const GoogleOauth = () => {
  const { login, getCurrentUser } = useAuthStore((state) => state);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    getCurrentUser();
  }, []);
  if (user || loading) return null;

  return (
    <div
      style={{ colorScheme: resolvedTheme === "dark" ? "dark" : "light" }}
      className="flex flex-col rounded-lg border-2 border-border bg-popover px-4 py-4"
    >
      <p className="mb-4 text-xl font-semibold">{`Guess Y's Happening?`}</p>
      <GoogleLogin
        size="large"
        type="standard"
        useOneTap
        onSuccess={async (e) => {
          console.log(e);
          if (!e.credential) {
            return toast.error("Failed to login");
          }
          const res = await login(e.credential);

          if (res) {
            toast.success("Successfully logged in");
          } else {
            toast.error("Failed to login");
          }
        }}
        theme="filled_black"
        shape="square"
      />
    </div>
  );
};
