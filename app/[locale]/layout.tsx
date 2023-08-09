import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode, StrictMode} from "react";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";
import ThemeContext from "@/app/context/ThemeContext";
import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Garage Sale',
    description: 'Store your garage stuff easily!',
    icons: {
        icon: '/images/favicon.ico',
        apple: '/images/apple-touch-icon.png',
    },
    applicationName: 'GarageSale',
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
        <StrictMode>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ThemeContext>
                    <AuthContext>
                        <ToasterContext/>
                        {children}
                    </AuthContext>
                </ThemeContext>
            </NextIntlClientProvider>
        </StrictMode>
        </body>
        </html>
    )
}
