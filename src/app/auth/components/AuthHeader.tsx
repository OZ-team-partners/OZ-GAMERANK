"use client";

import React from "react";
import { Shield } from "lucide-react";
import { Chip, Fade } from "@mui/material";
import { useRouter } from "next/navigation";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  chipLabel: string;
}

const AuthHeader = ({ title, subtitle, chipLabel }: AuthHeaderProps) => {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <Fade in timeout={1000}>
      <div className="text-center mb-8">
        <h1 
          onClick={handleTitleClick}
          className="text-5xl font-bold font-bangers bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
        >
          {title}
        </h1>
        <p className="text-slate-300 text-base font-medium">{subtitle}</p>
        <Chip
          icon={<Shield size={14} />}
          label={chipLabel}
          size="small"
          className="mt-3"
          sx={{
            bgcolor: "rgba(99, 102, 241, 0.2)",
            color: "#c7d2fe",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            "& .MuiChip-icon": { color: "#c7d2fe" },
          }}
        />
      </div>
    </Fade>
  );
};

export default AuthHeader;