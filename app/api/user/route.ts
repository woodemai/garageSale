import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PUT(request: NextRequest) {
    try {
        const json = await request.json();
        const {name, email, oldEmail, image} = json;
        if (!name || !email || !oldEmail || !image) {
            return new NextResponse("Missing info", {status: 400});
        }
        const user = await prisma.user.findUnique({
            where: {email: oldEmail}
        });
        if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const id = user.id

        const changedUser = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
                image,
            }
        });
        return NextResponse.json(changedUser, {status: 200});
    } catch (error: any) {
        return new NextResponse("Internal Server Error", {status: 500});
    }
}