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
        where: {id},
        include: {
            items: {
                orderBy: {
                    updatedAt: 'desc'
                }
            }
        }
    });
    if (category) {
        return (
            <>
                 <div
                    className="
                    flex
                    justify-center
                    flex-col
                    gap-6
                    sm:my-6
                    items-center
                    w-full
                "
                >
                    <CategoryClientBlock category={category}/>
                    <List items={category.items} element={(item) => <ItemBlock item={item}/>} title="Items"/>
                </div>
            </>
        )
    }
};

export default Page;