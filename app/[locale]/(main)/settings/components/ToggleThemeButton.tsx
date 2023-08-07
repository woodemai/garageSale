'use client';
import ReactMarkdown from "react-markdown";
import {useTheme} from "next-themes";
import {CgSun} from "react-icons/cg";
import button from "@/app/components/UI/Button";
import {useEffect, useState} from "react";
import {BsMoonStars} from "react-icons/bs";
import {BiLoader} from "react-icons/bi";
import {useTranslations} from "next-intl";
import {toast} from "react-hot-toast";

const ToggleThemeButton = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [mounted]);
    const {systemTheme, theme, setTheme} = useTheme();
    const t = useTranslations('settings');
    const renderThemeChanger = () => {
        if (!mounted) return (
            <div className="w-10 h-10 text-gray-900 m-0 dark:text-gray-100">
                <BiLoader/>
            </div>
        )
        const currentTheme = theme === 'system' ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <button
                    onClick={() => {
                        setTheme('light');
                        toast.success(t('success'))
                    }}
                    className="
                    mt-4
                    w-28
                    h-10
                    rounded-full
                    ring-1
                    ring-inset
                    ring-gray-200
                    dark:ring-gray-900
                    p-2
                    px-4
                    flex
                    justify-start
                    dark:justify-end
                    items-center
                    dark:text-right
                    bg-gray-100
                    dark:bg-gray-950

                "
                >
                    <div className="w-fit h-fit text-blue-500">
                        <BsMoonStars/>
                    </div>
                </button>
            )
        } else {
            return (
                <button
                    onClick={() => {
                        setTheme('dark');
                        toast.success(t('success'))
                    }}
                    className="
                    mt-4
                    h-10
                    rounded-full
                    ring-1
                    ring-inset
                    ring-gray-200
                    dark:ring-gray-900
                    p-2
                    px-4
                    flex
                    justify-start
                    dark:justify-end
                    items-center
                    dark:text-right
                    bg-gray-100
                    dark:bg-gray-950
                    w-28
                "
                >
                    <div
                        className="w-fit h-fit text-yellow-500 text-right"
                    >
                        <CgSun/>
                    </div>
                </button>
            )
        }
    }
    return (
        <div className="
                bg-white
                dark:bg-gray-900
                px-8
                py-2
                rounded-xl
                text-left
                w-full
                sm:w-fit
                max-w-fit
                flex
                flex-row
                justify-between
                items-center
                gap-x-4
            "
        >
            <ReactMarkdown className="whitespace-nowrap inline-block">{t('theme')}</ReactMarkdown>
            {renderThemeChanger()}
        </div>
    )
}
export default ToggleThemeButton;
