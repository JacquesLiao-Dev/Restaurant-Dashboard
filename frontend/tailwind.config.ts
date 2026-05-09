import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
        neutral: {
          50: "#FCFAF7",
          100: "#F5EEE7",
          200: "#E8DBCF",
          300: "#D5C2B1",
          400: "#B79A86",
          500: "#967967",
          600: "#71584A",
          700: "#523F35",
          800: "#342822",
          900: "#1F1815",
        },
      },
      spacing: {
        page: "1rem",
        "page-sm": "1.5rem",
        "page-lg": "2rem",
        "space-4": "0.25rem",
        "space-8": "0.5rem",
        "space-12": "0.75rem",
        "space-16": "1rem",
        "space-24": "1.5rem",
        "space-32": "2rem",
        "space-40": "2.5rem",
        "space-48": "3rem",
        "space-64": "4rem",
        section: "2rem",
        stack: "1.5rem",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "2rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(38, 28, 23, 0.08)",
        panel: "0 14px 42px rgba(38, 28, 23, 0.08)",
        floating: "0 18px 50px rgba(38, 28, 23, 0.14)",
        focus: "0 0 0 4px hsl(var(--ring) / 0.18)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "700" }],
        h1: ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        h2: ["1.875rem", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],
        label: ["0.875rem", { lineHeight: "1.4", fontWeight: "600" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      transitionDuration: {
        fast: "160ms",
        base: "240ms",
        slow: "360ms",
      },
      transitionTimingFunction: {
        standard: "ease-out",
        expressive: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.68" },
        },
        "dialog-in": {
          from: {
            opacity: "0",
            transform: "translate(-50%, calc(-50% + 18px)) scale(0.98)",
          },
          to: {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 240ms ease-out",
        "slide-up": "slide-up 320ms ease-out",
        "pulse-soft": "pulse-soft 1.8s ease-in-out infinite",
        "dialog-in": "dialog-in 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        dashboard: "1440px",
      },
      zIndex: {
        header: "30",
        sidebar: "40",
        overlay: "50",
      },
    },
  },
  plugins: [],
};

export default config;
