import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import ToasterContext from "@/app/context/ToasterContext";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Garage Sale',
    description: 'Store your garage stuff easily!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ToasterContext/>
        {children}
        </body>
        </html>
    )
}
