import { ReactNode } from "react";

import Meta from "./Meta";

interface MetaProps {
    title?: string;
    description?: string;
    children?: ReactNode;
}

export default function PageWrapper({ title, description, children }: MetaProps) {
    const siteTitle = "Bohemia Interactive job assignment 01";

    return (
        <div className="container mx-auto flex min-h-screen min-w-full flex-col">
            <Meta title={title} description={description} />

            <header className="border-b-2 bg-primary-100 px-4 pb-4 text-center dark:border-b-primary-700 dark:bg-primary-800 sm:pt-12">
                <h1 className="text-2xl font-bold leading-loose tracking-wide md:text-3xl">{siteTitle}</h1>
                {title && <h2 className="text-xl font-semibold tracking-wider md:text-2xl">{title}</h2>}
            </header>

            <main className="mx-auto flex w-full grow flex-col p-12 xl:px-32">{children}</main>
        </div>
    );
}
