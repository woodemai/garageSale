'use client';
import Link from "next/link";
import {IconType} from "react-icons";
import {FC} from "react";
import clsx from "clsx";

interface MobileItemProps {
    item: IconType,
    selected?: boolean
    href: string
}
const MobileItem:FC<MobileItemProps> = ({
    item:Icon,
    selected,
    href
                                        }) => {
    return (
        <Link
            href={href}
            className={clsx(
                `text-gray-400 dark:text-gray-700 text-lg p-4`,
                selected && 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200'
            )}
        >
            <Icon/>
        </Link>
    )
};
export default MobileItem;