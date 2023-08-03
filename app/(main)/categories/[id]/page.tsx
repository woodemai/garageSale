import React, {FC} from "react";
import CategoryClientBlock from "@/app/(main)/categories/[id]/components/CategoryClientBlock";
import ItemList from "@/app/components/UI/ItemList";
import List from "@/app/components/UI/List";
import ItemBlock from "@/app/components/item/ItemBlock";
import getCategoryWithItems from "@/app/actions/getCategoryWithItems";

interface PageProps {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({
                                       params: {id}
                                   }) => {
    const category = await getCategoryWithItems(id);
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