'use client';
import CreateItem from "@/app/components/CreateItem";
import Modal from "@/app/components/UI/Modal";
import prismadb from "@/app/libs/prismadb";

const Page = async () => {
    const categories = await prismadb.category.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return (
        <Modal>
            <CreateItem categories={categories}/>
        </Modal>
    )
};

export default Page;