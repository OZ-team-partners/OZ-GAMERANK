"use client";

import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps {
  type: "email" | "password" | "text";
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const AuthInput = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  icon,
  showPassword,
  onTogglePassword,
}: AuthInputProps) => {
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <TextField
      fullWidth
      type={inputType}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: icon ? (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ) : undefined,
          endAdornment: type === "password" && onTogglePassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePassword}
                edge="end"
                sx={{ color: "#94a3b8" }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{
        mt: 3,
        "& .MuiOutlinedInput-root": {
          bgcolor: "rgba(51, 65, 85, 0.6)",
          borderRadius: "12px",
          "& fieldset": {
            borderColor: "rgba(148, 163, 184, 0.3)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(148, 163, 184, 0.5)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6366f1",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#94a3b8",
        },
        "& .MuiInputBase-input": {
          color: "white",
        },
      }}
    />
  );
};

export default AuthInput;