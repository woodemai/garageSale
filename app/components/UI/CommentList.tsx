import {FC} from "react";
import ReactMarkdown from "react-markdown";
import CommentBlock from "@/app/components/comments/CommentBlock";
import {Comment, User} from "@prisma/client";

interface ListProps {
    items: (Comment & { sender: User })[],
    title?: string,
    noItemsErrorMessage?: string
}

const CommentList: FC<ListProps> = ({
                                        items,
                                        title,
                                        noItemsErrorMessage,
                                    }) => {
    if (noItemsErrorMessage === undefined) noItemsErrorMessage = "";
    return (
        <div
            className="
                mx-auto
                w-full
                sm:max-w-sm
                md:max-w-md
                lg:max-w-lg
                xl:max-w-xl
                2xl:max-w-2xl
                flex
                flex-col
                items-center
            "
        >

            <div className="w-full sm:max-w-2xl">
                {title && items.length > 0 &&
                    <ReactMarkdown
                        className="
                            font-bold
                            text-xl
                            mb-6
                            text-center
                            sm:text-left
                        "
                    >
                        {title}
                    </ReactMarkdown>}
                <div
                    className="
                flex
                flex-col
                w-full
                gap-4
            "
                >
                    {items.map((comment) => <CommentBlock key={comment.id} comment={comment}/>)}
                </div>
            </div>
            {items.length < 1 &&
                <div className="flex justify-center items-center text-gray-500 font-light mt-4">
                    <ReactMarkdown>{noItemsErrorMessage ? noItemsErrorMessage : "No items found"}</ReactMarkdown>
                </div>
            }

        </div>
    );
};

export default CommentList;