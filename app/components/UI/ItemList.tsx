'use client';
import {FC, useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import Search from "@/app/components/UI/Search";
import {Item} from "@prisma/client";
import ItemBlock from "@/app/components/item/ItemBlock";
import {useTranslations} from "next-intl";

interface ListProps {
    items: Item[],
    search?: boolean
}

const List: FC<ListProps> = ({
                                 items,
                                 search
                             }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchItems, setSearchItems] = useState(items);
    useEffect(() => {
        setSearchItems([...items.filter(item => {
            const search = searchValue.trim().toLowerCase();
            const nameFilter = item.name.trim().toLowerCase().includes(search)
            const descriptionFilter = item.description.trim().toLowerCase().includes(search)
            const quantityFilter = item.quantity.toString().includes(search)
            return nameFilter || descriptionFilter || quantityFilter;
        })])
    }, [searchValue, items])
    const t = useTranslations('itemList');
    return (
        <div
            className="
                mx-auto
                w-full
                sm:max-w-lg
                md:max-w-xl
                xl:max-w-2xl
                flex
                flex-col
                items-center
                text-gray-900
                dark:text-gray-100
            "
        >

            <div className="w-full sm:max-w-2xl">
                {searchItems.length > 0 &&
                    <ReactMarkdown
                        className="
                            font-bold
                            text-xl
                            mb-6
                            text-center
                            sm:text-left
                        "
                    >
                        {t('title')}
                    </ReactMarkdown>}
                {search &&
                    <div className="my-2">
                        <Search placeholder={t('placeholder')}
                                label={t('search')}
                                id="search"
                                onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                }
                <div
                    className="
                flex
                flex-col
                w-full
                gap-4
            "
                >
                    {searchItems.map((item: Item) => <ItemBlock key={item.id} item={item}/>)}
                </div>
                {searchItems.length < 1 &&
                <div className="flex justify-center items-center text-gray-500 font-light mt-4">
                    <ReactMarkdown>{t('notFound')}</ReactMarkdown>
                </div>
                }
            </div>
        </div>
    );
};

export default List;