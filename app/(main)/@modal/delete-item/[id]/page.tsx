import Modal from "@/app/components/UI/Modal";
import prismadb from "@/app/libs/prismadb";
import ItemDelete from "@/app/components/ItemDelete";
import ReactMarkdown from "react-markdown";
import {FC} from "react";
interface PageProps {
    params: {
        id: string
    }
}
const Page:FC<PageProps> = async ({
    params: {
        id
    }
                                  }) => {
    const item = await prismadb.item.findUnique({
        where: {
            id
        }
    })
    if (item) {
        return (
            <Modal>
                <ItemDelete item={item}/>
            </Modal>
        )
    }else {
        return (
            <ReactMarkdown>Item was not found</ReactMarkdown>
        )
    }
};

export default Page;