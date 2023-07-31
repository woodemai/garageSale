import Modal from "@/app/components/UI/Modal";
import prismadb from "@/app/libs/prismadb";
import ItemEdit from "@/app/components/ItemEdit";
import {FC} from "react";
import ReactMarkdown from "react-markdown";

interface PageProps {
    params: {
        id: string
    }
}
const Page:FC<PageProps> = async ({
    params: {id}
                                  }) => {
    const categories = await prismadb.category.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    const item = await prismadb.item.findUnique({
        where: {
            id
        }
    })
    if (item) {
    return (
        <Modal>
            <ItemEdit item={item} categories={categories}/>
        </Modal>
    )
    }else {
        return (
            <ReactMarkdown>Item was not found</ReactMarkdown>
        )
    }
};

export default Page;