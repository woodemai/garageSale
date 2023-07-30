import {FC} from "react";
import prismadb from "@/app/libs/prismadb";
import ReactMarkdown from "react-markdown";
import ButtonBack from "@/app/components/UI/ButtonBack";

interface PageProps {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({
                                       params: {id}
                                   }) => {
    const item = await prismadb.item.findUnique({
        where: {id}
    });
    if (!item) {
        return (
            <div
                className="
                    flex
                    justify-center
                    items-center
                    text-xl
                    font-bold
                "
            >
                <ReactMarkdown>
                    Item was not found
                </ReactMarkdown>
            </div>
        )
    }
    const category = await prismadb.category.findUnique({
        where: {id: item.categoryId as string}
    });
    if (category) {
        return (
            <div
                className="
                    flex
                    justify-center
                    items-center
                    w-full
                "
            >
                <div
                    className="
                    flex
                    flex-col
                    gap-2
                    p-4
                    rounded-l
                    bg-white
                    text-gray-500
                    w-1/2
                "
                >
                    <ButtonBack/>
                    <ReactMarkdown
                        className="text-xl font-bold">{item.name + " - " + String(item.quantity)}</ReactMarkdown>
                    <ReactMarkdown className="text-xs mb-2">{category.description}</ReactMarkdown>
                    <ReactMarkdown>{item.description}</ReactMarkdown>
                </div>
            </div>
        );
    }
};

export default Page;