import prisma from "@/app/libs/prismadb";

const getItems = async () => {
    try {
        return await prisma.item.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        });
    } catch (error: any) {
        return [];
    }
}
export default getItems;