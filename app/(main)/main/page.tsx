import CreateItem from "@/app/components/CreateItem";
import ReactMarkdown from "react-markdown";
import CreateCategory from "@/app/components/CreateCategory";

const Main = () => {
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
                    <CreateItem/>
                    <CreateCategory/>
                </div>
            </div>
        </div>
    );
};

export default Main;