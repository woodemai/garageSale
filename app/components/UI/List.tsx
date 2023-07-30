import {FC, ReactNode} from "react";
import ReactMarkdown from "react-markdown";

interface ListProps<T> {
    items: T[],
    element: (item: T) => ReactNode,
    title: string,
    noItemsErrorMessage?: string
}

const List: FC<ListProps<any>> = ({
                                      items,
                                      element,
                                      title,
                                      noItemsErrorMessage
                                  }) => {
    if (noItemsErrorMessage === undefined) noItemsErrorMessage = "";
    return (
        <div
            className="
                w-full
                flex
                flex-col
                items-center
            "
        >
            {items.length > 0
                ?
                <div className="w-1/2">
                    <ReactMarkdown
                        className="
                            font-bold
                            text-xl
                            ml-2
                            mb-6
                        "
                    >
                        {title}
                    </ReactMarkdown>
                    <div
                        className="
                flex
                flex-col
                gap-4
            "
                    >
                        {items.map((item) => element(item))}
                    </div>
                </div>
                : <ReactMarkdown>{noItemsErrorMessage}</ReactMarkdown>}

        </div>
    );
};

export default List;