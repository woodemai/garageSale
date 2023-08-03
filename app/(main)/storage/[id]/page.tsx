import {FC} from "react";
import prisma from "@/app/libs/prismadb";
import ClientBlock from "@/app/(main)/storage/[id]/components/ClientBlock";
import getCategories from "@/app/actions/getCategories";

interface PageProps {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({
                                       params: {id}
                                   }) => {
    const categories = await getCategories();
    const item = await prisma.item.findUnique({
        where: {id},
        include: {
            user: true,
            category: true,
            comments: {
                include: {
                    sender: true
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }
        }

    });
    if (item) {
            return <ClientBlock categories={categories} item={item}/>

    }
};

export default Page;