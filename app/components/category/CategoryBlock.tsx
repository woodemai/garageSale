import {Category} from "@prisma/client";
import {FC} from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";

interface CategoryBlockProps {
    category: Category
}

const CategoryBlock:FC<CategoryBlockProps> = ({
    category
                                              }) => {
    return (
       <Link href={`/categories/${category.id}`}>
           <div
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
                min-w-full
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
               <div>
                   {category.image && <Image
                       className="
                        rounded-md
                        border-sky-200
                        border
                        object-cover
                        w-24
                        h-24
                        shadow-sm
                    "
                       width={48}
                       height={48}
                       src={category.image}
                       alt={'image'}/>}
               </div>
           </div>
       </Link>
    );
};

export default CategoryBlock;