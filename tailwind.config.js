/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(220 14.75% 11.96%)",
        foreground: "hsl(0 0% 89.80%)",
        card: {
          DEFAULT: "hsl(197 6.93% 19.80%)",
          foreground: "hsl(0 0% 89.80%)",
        },
        popover: {
          DEFAULT: "hsl(197 6.93% 19.80%)",
          foreground: "hsl(0 0% 89.80%)",
        },
        primary: {
          DEFAULT: "hsl(247 74.33% 63.33%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(275 100% 25.49%)",
          foreground: "hsl(0 0% 89.80%)",
        },
        accent: {
          DEFAULT: "hsl(219 79.19% 66.08%)",
          foreground: "hsl(0 0% 89.80%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.24% 60.20%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 26.67%)",
          foreground: "hsl(0 0% 63.92%)",
        },
        border: "hsl(0 0% 26.67%)",
        input: "hsl(0 0% 26.67%)",
        ring: "hsl(247 74.33% 63.33%)",
        chart: {
          1: "hsl(247 74.33% 63.33%)",
          2: "hsl(282 43.57% 47.25%)",
          3: "hsl(275 100% 25.49%)",
          4: "hsl(219 79.19% 66.08%)",
          5: "hsl(207 44% 49.02%)",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        '2xs': '0px 5px 10px -2px hsl(0 0% 0% / 0.05)',
        'xs': '0px 5px 10px -2px hsl(0 0% 0% / 0.05)',
        'sm': '0px 5px 10px -2px hsl(0 0% 0% / 0.10), 0px 1px 2px -3px hsl(0 0% 0% / 0.10)',
        'md': '0px 5px 10px -2px hsl(0 0% 0% / 0.10), 0px 2px 4px -3px hsl(0 0% 0% / 0.10)',
        '2xl': '0px 5px 10px -2px hsl(0 0% 0% / 0.25)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '2xs': '16rem',
        '8xl': '88rem',
        '9xl': '96rem',
      },
      letterSpacing: {
        DEFAULT: '0em',
      },
    },
  },
  plugins: [],
}