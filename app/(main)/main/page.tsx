import ItemCreate from "@/app/components/ItemCreate";
import ReactMarkdown from "react-markdown";
import CreateCategory from "@/app/components/CategoryCreate";
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
                m-8
                w-full
                h-full
            "
        >
            <div>
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
                    flex-row
                    w-full
                    justify-between
                    items-start
                    h-full
                    gap-8
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