"use client";
import { useAuthStore } from "@/store/auth.store";
import React from "react";
import { Button } from "./ui/button";

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <Button onClick={logout} variant="destructive">
      Logout
    </Button>
  );
};

export default Logout;
