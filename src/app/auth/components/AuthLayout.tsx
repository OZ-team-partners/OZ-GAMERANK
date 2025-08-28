"use client";

import React from "react";
import { Grow } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center relative overflow-hidden">

      <Grow in timeout={800}>
        <div className="w-full max-w-md p-6 relative z-10">
          {children}
        </div>
      </Grow>

    </div>
  );
};

export default AuthLayout;