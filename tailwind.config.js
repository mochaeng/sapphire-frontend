/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // my colors
        primaryOnly: "hsl(var(--primary-only))",
        secondaryOnly: "hsl(var(--secondary-only))",
        profileHeader: "hsl(var(--profile-header))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        1: "1px",
      },
      screens: {
        md: "500px",
        lg: "616px",
        "lg-1": "768px", // the center wrapper get thiner
        "lg-2": "1004px", // the right wrapper appears
        xl: "1280px",
      },
      width: {
        first: "632px",
        second: "384px",
      },
      height: {
        header: "calc(var(--header-height))",
      },
      maxWidth: {
        authForm: "344px",
        first: "632px",
        second: "384px",
        sapphire: "1296px",
        centerWrapper: "632px",
        rightWrapper: "384px",
      },
      maxHeight: {
        post: "calc(var(--vh, 1vh)* 100 - 120px)",
      },
      fontSize: {
        fontPrimary: "19px",
        sapphire: ["19px", "24px"],
      },
      padding: {
        header: "calc(var(--header-height))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
