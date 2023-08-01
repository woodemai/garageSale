import ItemCreate from "@/app/components/item/ItemCreate";
import ReactMarkdown from "react-markdown";
import CreateCategory from "@/app/components/category/CategoryCreate";
import prismadb from "@/app/libs/prismadb";

const Main = async () => {
    const categories = await prismadb.category.findMany();
    return (
        <div
            className="
                flex
                justify-start
                flex-col
                items-center
                w-full
                h-full
                mt-4
            "
        >
            <div className="w-full">
                <ReactMarkdown
                    className="
                        text-3xl
                        font-bold
                        text-center
                        mb-12
                    "
                >
                    Main menu
                </ReactMarkdown>
                <div
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    items-start
                    h-full
                    gap-8
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