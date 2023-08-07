import getItems from "@/app/actions/getItems";
import ItemList from "@/app/components/UI/ItemList";

export const dynamic = 'force-dynamic';


const Storage = async () => {
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
                search
            />
        </div>
    );
};

export default Storage;