export const theme = {
  colors: {
    primary: "#6B4F4F", // Coffee brown
    secondary: "#D9CAB3",
    background: "#F7F3F0",
    text: "#3E3E3E",
    white: "#FFFFFF",
    accent: "#C08552",
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Roboto', sans-serif",
  },
  spacing: (factor: number) => `${factor * 8}px`,
  borderRadius: "12px",
};