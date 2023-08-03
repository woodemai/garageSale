import {FC, ReactNode} from "react";
import ReactMarkdown from "react-markdown";

interface ListProps<T> {
    items: T[],
    element: (item: T) => ReactNode,
    title?: string,
    noItemsErrorMessage?: string
    search?: boolean
}

const List: FC<ListProps<any>> = ({
                                      items,
                                      element,
                                      title,
                                      noItemsErrorMessage,
                                      search
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
            {items.length > 0
                ?
                <div className="w-full sm:max-w-2xl">
                    {title &&
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
                        {items.map((item) => element(item))}
                    </div>
                </div>
                : <ReactMarkdown>{noItemsErrorMessage}</ReactMarkdown>}

        </div>
    );
};

export default List;