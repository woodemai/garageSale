import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
    request: NextRequest,
    {params: {id}}: { params: { id: string } }
) {
    try {
        const category = await prisma.category.delete({
            where: {id}
        });
        if (category) {
            return NextResponse.json(category, {status: 200});
        } else {
            return new NextResponse('Category was not found', {status: 404});
        }
    } catch (error: any) {
        console.log(error, 'Deleting category error');
        return new NextResponse('Internal error', {status: 500});
    }
}