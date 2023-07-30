import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {name, description, image} = json;
        const quantity = Number(json.quantity);
        if (!name || !description || !quantity) {

            return new NextResponse('Missing info', {status: 400});
        }
        const item = await prismadb.item.create({
            data: {
                name,
                description,
                quantity,
                image
            }
        })
        if (item) {
            return NextResponse.json(item, {status: 200});
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Creating item error', {status: 500});
    }
}