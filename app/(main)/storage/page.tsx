import prismadb from "@/app/libs/prismadb";
import ItemBlock from "@/app/components/item/ItemBlock";
import List from "@/app/components/UI/List";

const Page = async () => {
    const items = await prismadb.item.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return (
        <div className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                mx-auto
                m-2
                p-2
            "
        >
            <List
                items={items}
                element={(item) => <ItemBlock item={item}/>}
                title={`Items - ` + items.length}
                noItemsErrorMessage="No items found"
            />
        </div>
    );
};

export default Page;