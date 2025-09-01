export const dropdownStyles = {
  container: "absolute top-full mt-3 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150",
  content: "bg-white/98 backdrop-blur-xl border border-slate-200/40 rounded-2xl shadow-lg overflow-hidden ring-1 ring-slate-900/5",
  padding: "p-2",
  buttonBase: "flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition-all duration-150 ease-out shadow-md cursor-pointer backdrop-blur-sm",
  chevron: "transition-transform duration-150",
} as const;

export const buttonVariants = {
  primary: "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg hover:shadow-indigo-500/15",
  success: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/15",
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