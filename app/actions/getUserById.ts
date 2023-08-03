import prisma from "@/app/libs/prismadb";

export default async function getUserById(id: string | null) {
    try {
        return id
            ? await prisma.user.findUnique({
                where: {
                    id
                }
            })
            : null;
    } catch (error: any) {
        return null;
    }
}