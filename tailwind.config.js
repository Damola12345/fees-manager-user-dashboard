/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "BR Firma",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen-Sans",
        "Ubuntu",
        "Cantarell",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    fontSize: {
      14: [
        "14px",
        {
          lineHeight: "22px",
          letterSpacing: "",
        },
      ],
      16: [
        "16px",
        {
          lineHeight: "25px",
          letterSpacing: "",
        },
      ],
      18: [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "",
        },
      ],
      20: [
        "20px",
        {
          lineHeight: "28px",
          letterSpacing: "",
        },
      ],
      24: [
        "24px",
        {
          lineHeight: "",
          letterSpacing: "",
        },
      ],
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "22px",
      "2xl": "28px",
      "3xl": "30px",
    },
    colors: {
      transparent: "transparent",
      black: {
        DEFAULT: "#1A1B1E",
        300: "#121212",
        400: "#1F1F1F",
        500: "#232323",
      },
      red: {
        DEFAULT: "#f00",
        error: "#AC200E",
      },
      purple: {
        DEFAULT: "#3c073c",
      },
      midPurple: {
        DEFAULT: "#680E4B",
      },
      blue: {
        DEFAULT: "#045CF4",
        hover: "#2271FB",
        focus: "#0046BF",
        disabled: "#7DA8F1",
      },
      green: {
        DEFAULT: "#11A73B",
        success: "#11A73B",
        successbg: "#E8FCEE",
      },
      navy: {
        DEFAULT: "linear-gradient(359.87deg, #13141b -5.8%, #030725 106.4%)",
      },
      white: {
        DEFAULT: "#ffffff",
      },
      grey: {
        DEFAULT: "rgba(255, 255, 255, 0.6)",
        100: "#717171",
        200: "#F8F8FB",
        300: "rgba(18, 18, 18, 0.6)",
        400: "#525252",
        500: "rgba(31, 31, 31, 0.6)",
        dark: "#515356",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      height: {
        11: "44px",
        12: "48px",
        13: "52px",
        14: "56px",
        15: "60px",
        16: "64px",
        17: "68px",
        18: "72px",
        19: "76px",
      },
      boxShadow: {},
    },
  },
  plugins: [],
};
