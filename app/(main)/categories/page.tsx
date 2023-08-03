import React from 'react';
import prisma from "@/app/libs/prismadb";
import List from "@/app/components/UI/List";
import CategoryBlock from "@/app/components/category/CategoryBlock";
import getCategories from "@/app/actions/getCategories";

const Page = async () => {
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
                title="Categories"
                noItemsErrorMessage="No categories found"
            />
        </div>
    );
};

export default Page;