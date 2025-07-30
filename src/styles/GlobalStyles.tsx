/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { theme } from "./theme";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: ${theme.fonts.body};
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          line-height: 1.6;
        }
        h1,h2,h3 { font-family: ${theme.fonts.heading}; }
      `}
    />
  );
}
