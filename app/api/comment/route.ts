import {NextRequest, NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: NextRequest
) {
    try {
        const json = await request.json();
        const {body, itemId, userEmail} = json;
        if (!body || !itemId || !userEmail) {
            return new NextResponse('Missing info', {status: 400});
        }
        const user = await prisma.user.findUnique({
            where: {
                email:userEmail
            }
        });
        if (!user) {
            return new NextResponse('Unauthorized', {status: 401});
        }
        const comment = await prisma.comment.create({
            data: {
                body,
                senderId: user.id,
                itemId: itemId
            }
        })
        if (comment) {
            return NextResponse.json(comment, {status: 200});
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Creating item error', {status: 500});
    }
}