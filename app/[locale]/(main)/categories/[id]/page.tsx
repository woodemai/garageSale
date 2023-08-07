import React, {FC} from "react";
import CategoryClientBlock from "@/app/[locale]/(main)/categories/[id]/components/CategoryClientBlock";
import ItemList from "@/app/components/UI/ItemList";
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
                    <ItemList items={category.items} search/>
                </div>
            </>
        )
    }
};

export default Page;