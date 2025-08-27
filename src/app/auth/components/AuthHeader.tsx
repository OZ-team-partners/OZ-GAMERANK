"use client";

import React from "react";
import { Trophy, Star, Shield } from "lucide-react";
import { Chip, Fade } from "@mui/material";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  chipLabel: string;
}

const AuthHeader = ({ title, subtitle, chipLabel }: AuthHeaderProps) => {
  return (
    <Fade in timeout={1000}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/25 relative">
          <Trophy className="text-white" size={36} />
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
              <Star className="text-white" size={12} />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold font-bangers bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 drop-shadow-lg">
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