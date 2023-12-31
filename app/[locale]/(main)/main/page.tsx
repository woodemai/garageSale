import ItemCreate from "@/app/components/item/ItemCreate";
import ReactMarkdown from "react-markdown";
import CreateCategory from "@/app/components/category/CategoryCreate";
import prismadb from "@/app/libs/prismadb";
import {getTranslator} from "next-intl/server";

const Main = async ({
                        params: {locale}
                    }:
                        { params: { locale: string } }) => {
    const t = await getTranslator(locale, 'menu')
    const categories = await prismadb.category.findMany();
    return (
        <div
            className="
                flex
                justify-start
                flex-col
                items-center
                w-full
            "
        >
            <div className="w-full">
                <ReactMarkdown
                    className="
                        text-3xl
                        font-bold
                        text-center
                        my-8
                    "
                >
                    {t('title')}
                </ReactMarkdown>
                <div
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    items-start
                    gap-8
                    mb-20
                    w-full
                "
                >
                    <ItemCreate categories={categories}/>
                    <CreateCategory/>
                </div>
            </div>
        </div>
    );
};

export default Main;