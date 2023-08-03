import prisma from "@/app/libs/prismadb";

const getCategoryWithItems = async (id:string) => {
    try {
        return await prisma.category.findUnique({
            where: {id},
            include: {
                items: {
                    orderBy: {
                        updatedAt: 'desc'
                    }
                }
            }
        });
    } catch (error: any) {
        return null;
    }
}
export default getCategoryWithItems;