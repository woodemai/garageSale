import {Comment, User} from "@prisma/client";
import {FC} from "react";
import ReactMarkdown from "react-markdown";
import {format} from "date-fns";

interface CommentBlockProps {
    comment: Comment & { sender: User | null }
}

const CommentBlock: FC<CommentBlockProps> = ({
                                                 comment
                                             }) => {
    return (
        <div
            className="
                flex
                flex-col
                w-full
                rounded-md
                border
                border-gray-200
                p-4
            "
        >
            {comment.sender?.name
                && <ReactMarkdown
                    className="text-xs font-light mb-2">
                    {`${comment.sender.name}`}
            </ReactMarkdown>}
            <ReactMarkdown>{comment.body}</ReactMarkdown>
            <ReactMarkdown
            className="text-xs font-light mt-4 text-sky-500"
            >{format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm")}</ReactMarkdown>
        </div>
    );
};

export default CommentBlock;