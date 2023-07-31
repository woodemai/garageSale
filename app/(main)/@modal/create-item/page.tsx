import ItemCreate from "@/app/components/ItemCreate";
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
            <ItemCreate categories={categories}/>
        </Modal>
    )
};

export default Page;