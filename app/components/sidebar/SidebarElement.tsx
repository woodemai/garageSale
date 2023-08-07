import React, {FC} from 'react';
import {IconType} from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface SidebarElementProps {
    icon: IconType
    selected?: boolean
    xl?: boolean
    disabled?: boolean
    href: string
}

const SidebarElement: FC<SidebarElementProps> = ({
                                                     icon: Icon,
                                                     selected,
                                                     xl,
                                                     disabled,
                                                     href,
                                                 }) => {
    return (
        <Link
            href={href}
            className={clsx(`
                inline-flex
                text-gray-400
                dark:text-gray-700 
                rounded-md
                transition-all duration-200
                p-3
                cursor-default
                lg:text-xl
                xl:text-2xl
                2xl:text-3xl`,
                selected && "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200",
                xl ? "text-3xl" : "text-lg",
                !disabled && " hover:bg-gray-200 hover:dark:bg-gray-600 hover:dark:text-gray-200 hover:shadow-sm hover:text-gray-900 cursor-pointer")}
        >
            <Icon/>
        </Link>
    );
};

export default SidebarElement;