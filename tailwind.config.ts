import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        card: "#f5f5f5",
        charcoal: "#1e1e1e",
        muted: "rgba(0,0,0,0.5)",
        line: "rgba(0,0,0,0.3)",
      },
      fontFamily: {
        serif: ["var(--font-inria)", "Georgia", "serif"],
        blackletter: [
          '"Old English Text MT"',
          "var(--font-pirata)",
          "Georgia",
          "serif",
        ],
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-y": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "marquee-y": "marquee-y 60s linear infinite",
        "toast-in": "toast-in 0.3s ease forwards",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
