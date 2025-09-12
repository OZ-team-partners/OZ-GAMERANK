"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { IconButton, Dialog, DialogContent, TextField, InputAdornment } from "@mui/material";

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("검색어:", searchQuery);
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        className="mobile-search-icon"
        sx={{
          display: "none",
          "@media (max-width: 768px)": {
            display: "inline-flex",
          },
          color: "#CBD5E1",
          padding: "8px",
          "&:hover": {
            backgroundColor: "rgba(148, 163, 184, 0.1)",
            color: "#FFFFFF",
          },
        }}
        aria-label="검색"
      >
        <Search size={20} />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "#1e293b",
            borderRadius: 2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogContent sx={{ padding: 2 }}>
          <form onSubmit={handleSearch}>
            <TextField
              inputRef={inputRef}
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="게임 검색..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} style={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClose}
                      size="small"
                      sx={{ color: "#94a3b8" }}
                    >
                      <X size={18} />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#0f172a",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#334155",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#475569",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1",
                  },
                  "& input": {
                    color: "#e2e8f0",
                    "&::placeholder": {
                      color: "#64748b",
                      opacity: 1,
                    },
                  },
                },
              }}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchModal;