import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import theme from "@app/styles/theme";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png'></link>
          <meta name='theme-color' content={theme.colors.primary} />

          {/* SEO */}
          <title>Meu App</title>
          <meta
            name='description'
            content='Acompanhe suas finanças diariamente! Saiba exatamente quanto gastar por dia.'
          />
          <meta
            name='keywords'
            content='finanças, fluxo de caixa, economizar, dinheiro, financeiro'
          />

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Monoton&display=swap'
            rel='stylesheet'
          />

          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
