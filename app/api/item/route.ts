import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {name, description, categoryId, email} = json;
        const quantity = Number(json.quantity);
        if (!name || !description || !quantity) {
            return new NextResponse('Missing info', {status: 400});
        }
        const image = json.imageUrl ? json.imageUrl : '';
        const user = await prismadb.user.findUnique({
             where: {
                 email
             }
         });
        if (!user) {
            return new NextResponse('Cannot find user', {status: 500});
        }
        const item = await prismadb.item.create({
            data: {
                name,
                description,
                quantity,
                image,
                categoryId,
                userId: user.id
            }
        })
        if (item) {
            return NextResponse.json(item, {status: 200});
        }
    } catch (error: any) {
        console.log(error, "Creating item error");
        return new NextResponse('Internal error', {status: 500});
    }
}
export async function PUT(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {name, description, categoryId, email,id} = json;
        const quantity = Number(json.quantity);
        if (!name || !description || !quantity) {
            return new NextResponse('Missing info', {status: 400});
        }
        const image = json.imageUrl ? json.imageUrl : '';
        const user = await prismadb.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return new NextResponse('Unauthenticated', {status: 401});
        }
        const item = await prismadb.item.update({
            where: {
                id
            },
            data: {
                name,
                description,
                quantity,
                image,
                categoryId,
                userId: user.id
            }
        })
        if (item) {
            return NextResponse.json(item, {status: 200});
        }
    } catch (error: any) {
        console.log(error, 'Updating item error');
        return new NextResponse('Internal error', {status: 500});
    }
}