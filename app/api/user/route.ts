import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function PUT(request: NextRequest) {
    try {
        const json = await request.json();
        const {name, email, oldEmail, image, oldPassword, password} = json;
        const user = await prisma.user.findUnique({
            where: {email: oldEmail}
        });
        if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const {id, hashedPassword} = user;
        if (oldPassword !== "") {
            const isCorrectPassword = await bcrypt.compare(oldPassword, hashedPassword as string);
            if (!isCorrectPassword) {
                return new NextResponse("Invalid password", {status:400});
            }
            if (password === hashedPassword) {
                const newPassword = await  bcrypt.hash(password, 12);
                const changedUser = await prisma.user.update({
                    where: {id},
                    data: {
                        name,
                        email,
                        image,
                        hashedPassword: newPassword
                    }
                });
                return NextResponse.json(changedUser, {status: 200});
            }
        }
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