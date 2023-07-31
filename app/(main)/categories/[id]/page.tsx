import React, {FC} from "react";
import prisma from "@/app/libs/prismadb";
import CategoryClientBlock from "@/app/(main)/categories/[id]/components/CategoryClientBlock";
import List from "@/app/components/UI/List";
import ItemBlock from "@/app/components/item/ItemBlock";

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
    const categoryItems = await prisma.category.findUnique({
        where: {id},
    }).items({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    if (category && categoryItems) {
        return (
            <>
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
                    <CategoryClientBlock category={category} items={categoryItems}/>
                    <List items={categoryItems} element={(item) => <ItemBlock item={item}/>} title="Items"/>
                </div>
            </>
        )
    }
};

export default Page;