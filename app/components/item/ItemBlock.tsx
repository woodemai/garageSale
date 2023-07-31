import {FC} from 'react';
import {Item} from "@prisma/client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/libs/prismadb";
import {format} from 'date-fns';
interface ItemProps {
    item: Item
}

const ItemBlock: FC<ItemProps> = async ({
                                            item
                                        }) => {
    const user = await prisma.user.findUnique({
        where: {
            id: item.userId as string
        }
    });
    if (user) {
        return (

            <Link href={`/storage/${item.id}`}>
                <div
                    className="
                flex
                flex-row
                justify-between
                items-center
                rounded-lg
                shadow-sm
                bg-white
                p-6
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
                    justify-start
                "
                    >
                        <ReactMarkdown className="font-bold">{item.name + " - "  + String(item.quantity)}</ReactMarkdown>
                        <ReactMarkdown className="">{item.description}</ReactMarkdown>
                        <ReactMarkdown className="text-xs text-sky-500">{`${user.name} ${format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}`}</ReactMarkdown>
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
                            width={192}
                            height={192}
                            src={item.image}
                            alt={'image'}/>}
                    </div>
                </div>
            </Link>
        );
    }
};

export default ItemBlock;