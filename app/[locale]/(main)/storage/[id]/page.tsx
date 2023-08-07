import {FC} from "react";
import prisma from "@/app/libs/prismadb";
import ClientBlock from "@/app/[locale]/(main)/storage/[id]/components/ClientBlock";
import getCategories from "@/app/actions/getCategories";

interface PageProps {
    params: {
        id: string
    }
}

const Page: FC<PageProps> = async ({
                                       params: {id}
                                   }) => {
    const categories = await getCategories();
    const item = await prisma.item.findUnique({
        where: {id},
        include: {
            user: true,
            category: true,
            comments: {
                include: {
                    sender: true
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }
        }

    });
    if (item) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-6
                    justify-center
                    items-center
                    w-full
                    mb-20
                "
            >
                <div
                    className="
                    sm:mt-10
                    flex
                    flex-col
                    gap-2
                    sm:p-4
                    sm:rounded-lg
                    sm:bg-white
                    dark:bg-gray-900
                    text-gray-900
                    dark:text-gray-200
                    w-full
                    sm:max-w-xl
                    p-4
                "
                >
                    <ClientBlock categories={categories} item={item}/>
                </div>
            </div>
        )
    }
};

export default Page;