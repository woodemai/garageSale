import {FC} from "react";
import prisma from "@/app/libs/prismadb";
import ReactMarkdown from "react-markdown";
import List from "@/app/components/UI/List";
import ItemBlock from "@/app/components/item/ItemBlock";
import ButtonBack from "@/app/components/UI/ButtonBack";

interface PageProps {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({
                                       params: {id}
                                   }) => {
    const category = await prisma.category.findUnique({
        where: {id}
    });
    if (!category) {
        return (
            <ReactMarkdown>
                Category not found!
            </ReactMarkdown>
        )
    }
    const categoryItems = await prisma.category.findUnique({
        where: {id},
    }).items({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    if (categoryItems) {
        return (
            <div
                className="
                    flex
                    justify-center
                    flex-col
                    gap-6
                    my-6
                    items-center
                    w-full
                "
            >
                <div
                    className="
                    flex
                    flex-col
                    gap-4
                    p-4
                    rounded-md
                    bg-white
                    text-gray-500
                    w-2/3
                "
                >

                    <ButtonBack/>
                    <ReactMarkdown
                        className="text-xl font-bold">{category.name + " - " + String(categoryItems.length)}</ReactMarkdown>
                    <ReactMarkdown className="text-xs mb-2">{category.description}</ReactMarkdown>
                </div>
                <List items={categoryItems} element={(item) => <ItemBlock item={item}/>} title="Items"/>

            </div>
        );
    }
};

export default Page;