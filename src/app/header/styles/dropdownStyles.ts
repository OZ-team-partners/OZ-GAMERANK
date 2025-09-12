export const dropdownStyles = {
  container: "absolute top-full mt-3 w-80 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200",
  content: "bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-purple-500/10 hover:border-purple-500/30 transition-all duration-300",
  padding: "p-3",
  buttonBase: "flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition-all duration-200 ease-out cursor-pointer backdrop-blur-sm",
  chevron: "transition-transform duration-200",
} as const;

export const buttonVariants = {
  primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500",
  success: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500",
} as const;

export const colors = {
  slate: {
    50: "#f8fafc",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8", 
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  indigo: {
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
  },
} as const;