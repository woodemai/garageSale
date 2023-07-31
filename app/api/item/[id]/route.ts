import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function DELETE (
    request: NextRequest,
    {params: {id}}: {params: {id:string}}
) {
    try {
        console.log(id)

        if (!id) {
            return new NextResponse('Id was not found', {status: 500});
        }
        const item = await prismadb.item.delete({
            where: {id}
        });
        if (item) {
            return NextResponse.json(item, {status: 200});
        }else {
            return new NextResponse('Internal error', {status: 500});
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Creating item error', {status: 500});
    }
}