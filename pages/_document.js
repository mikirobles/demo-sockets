import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />),
        );
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render() {
        return (
            <html>
                <Head>
                    <title>Sockets Test</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <style
                        dangerouslySetInnerHTML={{
                            __html:
                                '* {margin:0;padding:0;-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;box-sizing:border-box; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";}',
                        }}
                    />
                    {this.props.styleTags}
                    <link href={"https://rawgit.com/minhtranite/react-notifications/master/lib/notifications.css"} rel={"stylesheet"} type={"text/css"}/>
                    <meta
                        name="msapplication-config"
                        content="/static/images/favicon/browserconfig.xml"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta httpEquiv="x-rim-auto-match" content="none" />

                    <meta name="mobile-web-app-capable" content="yes" />

                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black"
                    />
                    <meta
                        name="apple-mobile-web-app-title"
                        content="Sockets demo"
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
