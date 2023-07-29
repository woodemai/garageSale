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
                text-gray-900 
                rounded-md
                transition-all duration-200
                p-3
                cursor-default`,
                selected && "bg-gray-100",
                xl ? "text-3xl" : "text-lg",
                !disabled && "text-gray-300 hover:bg-gray-200 hover:shadow-sm hover:text-gray-900 cursor-pointer")}
        >
            <Icon/>
        </Link>
    );
};

export default SidebarElement;