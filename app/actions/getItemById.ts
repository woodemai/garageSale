import prisma from "@/app/libs/prismadb";

const getItem = async (id:string) => {
    try {
        return await prisma.item.findUnique({
           where: {id}
        });
    } catch (error: any) {
        return null;
    }
}
export default getItem;