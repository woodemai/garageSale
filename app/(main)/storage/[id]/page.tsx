import {FC} from "react";
import prisma from "@/app/libs/prismadb";
import ClientBlock from "@/app/(main)/storage/[id]/components/ClientBlock";

interface PageProps {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({
                                       params: {id}
                                   }) => {
    const item = await prisma.item.findUnique({
        where: {id}
    });
    const categories = await prisma.category.findMany();
    if (item) {
        const category = await prisma.category.findUnique({
            where: {id: item.categoryId as string}
        });
        if (category) {
            return <ClientBlock categories={categories} item={item} category={category}/>
        }
    }
};

export default Page;