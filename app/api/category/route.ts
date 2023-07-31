import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {name, description} = json;
        if (!name || !description) {
            return new NextResponse("Missing data", {status: 400});
        }
        const image = json.imageUrl ? json.imageUrl : '';
        const category = await prisma.category.create({
            data: {
                name,
                description,
                image,
            },
        });
        if (!category) {
            return new NextResponse("Category was not created", {status: 500});
        }
        return NextResponse.json(category, {status: 200});
    } catch (error: any) {
        console.log(error, "Category creation error")
        return new NextResponse("Internal error", {status: 500});
    }
}
export async function PUT(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {name, description, id} = json;
        if (!name || !description || !id) {
            return new NextResponse("Missing data", {status: 400});
        }
        const image = json.imageUrl ? json.imageUrl : '';
        const category = await prisma.category.update({
            where: {id},
            data: {
                name,
                description,
                image,
            },
        });
        if (!category) {
            return new NextResponse("Category was not updated", {status: 500});
        }
        return NextResponse.json(category, {status: 200});
    } catch (error: any) {
        console.log(error, "Category update error");
        return new NextResponse("Internal error", {status: 500});
    }
}