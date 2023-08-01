import {Category} from "@prisma/client";
import {FC} from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface CategoryBlockProps {
    category: Category
}

const CategoryBlock: FC<CategoryBlockProps> = ({
                                                   category
                                               }) => {
    return (
        <Link
            href={`/categories/${category.id}`}
            className="
                flex
                flex-row
                justify-center
                items-center
                rounded-md
                shadow-sm
                bg-white
                p-4
                w-full
                mx-auto
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl
                2xl:max-w-2xl
                cursor-pointer
                text-gray-500
                hover:bg-white
                hover:text-gray-900
                hover:shadow-md
                transition-all duration-100
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    items-center
                    justify-center
                    text-center
                    w-full
                    mx-auto
                "
            >
                <ReactMarkdown className="font-bold w-full mx-auto">{category.name}</ReactMarkdown>
                <ReactMarkdown className="text-xs w-full mx-auto">{category.description}</ReactMarkdown>

            </div>
        </Link>
    )
        ;
};

export default CategoryBlock;