import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";
import ThemeContext from "@/app/context/ThemeContext";
import {NextIntlClientProvider, useLocale} from "next-intl";
import {notFound} from "next/navigation";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Garage Sale',
    description: 'Store your garage stuff easily!',
}

export default async function RootLayout({
                                             children,
                                             params
                                         }: {
    children: ReactNode,
    params: { locale: string }
}) {
    const {locale} = params
    let messages;
    try {
        messages = (await import((`../dictionary/${locale}.json`))).default
    } catch (error: any) {
        notFound();
    }
    return (
        <html lang={locale}>
        <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeContext>
                <AuthContext>
                    <ToasterContext/>
                    {children}
                </AuthContext>
            </ThemeContext>
        </NextIntlClientProvider>
        </body>
        </html>
    )
}
