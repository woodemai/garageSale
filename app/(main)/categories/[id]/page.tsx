import React, {FC} from "react";
import prisma from "@/app/libs/prismadb";
import CategoryClientBlock from "@/app/(main)/categories/[id]/components/CategoryClientBlock";
import ItemList from "@/app/components/UI/ItemList";

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
                    <ItemList items={category.items} search noItemsErrorMessage="No items found" title="Items"/>
                </div>
            </>
        )
    }
};

export default Page;