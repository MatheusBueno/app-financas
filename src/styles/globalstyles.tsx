import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.text};
    padding: 0;
    margin: 0;
    font-family: BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: 16px;
  }


  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }

  ul {
    padding-left: 24px;
  }
`;

export default GlobalStyle;
