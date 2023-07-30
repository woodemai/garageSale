import {FC} from 'react';
import {Item} from "@prisma/client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
    item: Item
}

const ItemBlock: FC<ItemProps> = ({
                                      item
                                  }) => {
    const date =
        item.createdAt.getDate() + "."
        + item.createdAt.getMonth() + "."
        + item.createdAt.getFullYear()
    console.log(item.createdAt)
    return (
        <Link href={`/storage/${item.id}`}>
            <div
                className="
                flex
                flex-row
                justify-between
                items-center
                rounded-md
                shadow-sm
                bg-white
                p-4
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
                    gap-4
                    items-start
                    justify-start
                "
                >
                    <ReactMarkdown>{item.name}</ReactMarkdown>
                    <ReactMarkdown>{item.description}</ReactMarkdown>
                    <ReactMarkdown>{String(item.quantity)}</ReactMarkdown>
                    <ReactMarkdown className="text-xs">{String(date)}</ReactMarkdown>
                </div>
                <div>
                    {item.image && <Image
                        className="
                        rounded-md
                        border-sky-200
                        border
                        object-cover
                        w-24
                        h-24
                        shadow-sm
                    "
                        width={48}
                        height={48}
                        src={item.image}
                        alt={'image'}/>}
                </div>
            </div>
        </Link>
    );
};

export default ItemBlock;