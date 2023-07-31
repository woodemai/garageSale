import React from 'react';
import prismadb from "@/app/libs/prismadb";
import List from "@/app/components/UI/List";
import CategoryBlock from "@/app/components/category/CategoryBlock";

const Page = async () => {
    const categories = await prismadb.category.findMany({
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
                items={categories}
                element={(category) => <CategoryBlock category={category}/>}
                title="Categories"
                noItemsErrorMessage="No categories found"
            />
        </div>
    );
};

export default Page;