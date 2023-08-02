'use client';
import {FC} from 'react';
import {Item} from "@prisma/client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import {format} from 'date-fns';

interface ItemProps {
    item: Item,
}

const ItemBlock: FC<ItemProps> = ({
                                            item
                                        }) => {
    return (
        <Link href={`/storage/${item.id}`}>
            <div
                className="
                flex
                flex-col
                sm:flex-row
                justify-between
                items-start
                rounded-lg
                shadow-sm
                bg-white
                p-6
                sm:w-2/3
                w-full
                min-w-full
                cursor-pointer
                text-gray-500
                hover:bg-white
                hover:text-gray-900
                hover:shadow-md
                transition-all duration-100
            "
            >
                <div
                    className="
                    flex
                    flex-col
                    gap-2
                    items-start
                    justify-between
                    h-full
                "
                >
                    <div>
                        <ReactMarkdown
                            className="font-bold text-xl">{item.name + " - " + String(item.quantity)}</ReactMarkdown>
                        <ReactMarkdown className="">{item.description}</ReactMarkdown>
                    </div>
                    <div>
                        <ReactMarkdown
                            className="text-xs text-sky-500">{`${format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}`}</ReactMarkdown>
                    </div>
                </div>
                <div>
                    {item.image && <Image
                        className="
                        rounded-md
                        border-sky-200
                        border
                        object-cover
                        w-fit
                        h-fit
                        shadow-sm
                    "
                        width={192}
                        height={192}
                        src={item.image}
                        alt={'image'}/>}
                </div>
            </div>
        </Link>
    );
};

export default ItemBlock;