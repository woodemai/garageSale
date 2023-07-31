import prisma from "@/app/libs/prismadb";

const getCategories = async () => {
    try {
        return await prisma.category.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        });
    } catch (error: any) {
        return [];
    }
}
export default getCategories;