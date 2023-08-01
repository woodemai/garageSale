import React, {FC} from "react";
import CategoryClientBlock from "@/app/(main)/categories/[id]/components/CategoryClientBlock";
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
                    <List items={category.items} element={(item) => <ItemBlock item={item}/>} title="Items"/>
                </div>
            </>
        )
    }
};

export default Page;