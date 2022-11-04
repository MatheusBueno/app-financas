import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      text: string;
      secondary: string;
      dark: string;
      positive: string;
      negative: string;
    };
    mensure: {
      navbarHeight: string;
      baseRadius: number;
    };
  }
}
