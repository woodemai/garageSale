import getItems from "@/app/actions/getItems";
import ItemList from "@/app/components/UI/ItemList";

export const dynamic = 'force-dynamic';


const Page = async () => {

    const items = await getItems();

    return (
        <div className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                mt-4
                mb-20
            "
        >
            <ItemList
                items={items}
                title={`Items - ` + items.length}
                noItemsErrorMessage="No items found"
                search
            />
        </div>
    );
};

export default Page;