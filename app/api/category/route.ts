import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {name, description, image} = json;
        if (!name || !description) {
            return new NextResponse("Missing data", {status: 400});
        }
        const category = await prismadb.category.create({
            data: {
                name,
                description,
                image,
            },
        });
        if (!category) {
            return new NextResponse("Category was not created", {status: 500});
        }
        return NextResponse.json(category, {status:200});
    } catch (error: any) {
        console.log(error)
        return new NextResponse("Category creation error", {status: 500});
    }
}