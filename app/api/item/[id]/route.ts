import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE (
    request: NextRequest,
    {params: {id}}: {params: {id:string}}
) {
    try {
        if (!id) {
            return new NextResponse('Id was not found', {status: 500});
        }
        const item = await prisma.item.delete({
            where: {id}
        });
        if (item) {
            return NextResponse.json(item, {status: 200});
        }else {
            return new NextResponse('Item was not found', {status: 404});
        }
    } catch (error: any) {
        console.log(error, 'Deleting category error');
        return new NextResponse('Internal error', {status: 500});
    }
}