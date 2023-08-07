import React from 'react';
import List from "@/app/components/UI/List";
import CategoryBlock from "@/app/components/category/CategoryBlock";
import getCategories from "@/app/actions/getCategories";
import {getTranslator} from "next-intl/server";

const Page = async ({
                        params: {locale}
                    }:
                        { params: { locale: string } }) => {
    const t = await getTranslator(locale, 'categories');
    const categories = await getCategories();
    return (
        <div className="
                flex
                flex-col
                items-center
                justify-start
                w-full
                mt-6
                mb-20
                sm:mb-0
                sm:mt-4
            "
        >
            <List
                items={categories}
                element={(category) => <CategoryBlock category={category}/>}
                title={t('title')}
                noItemsErrorMessage={t('notFound')}
            />
        </div>
    );
};

export default Page;