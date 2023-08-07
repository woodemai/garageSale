'use client';
import {ReactNode} from "react";
import {ThemeProvider} from "next-themes";

const ThemeContext = ({children}: { children: ReactNode }) => {
    return (
        <ThemeProvider enableSystem defaultTheme="light" attribute="class">
            {children}
        </ThemeProvider>
    )
}
export default ThemeContext;