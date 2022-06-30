import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-primary-50 transition-colors duration-300 motion-reduce:transition-none dark:bg-primary-900 dark:text-primary-300">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
