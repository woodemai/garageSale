'use client';
import React from 'react';
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import ReactMarkdown from "react-markdown";

const Page = () => {
    const session = useSession();
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-row-reverse justify-between w-1/2 rounded-lg bg-white p-4">
                <div className="overflow-hidden w-full flex justify-end">
                    <Image
                        src={session.data?.user?.image as string}
                        width={200}
                        height={200}
                        alt={'avatar'}
                        className="
                                h-full
                                rounded-full
                                object-cover
                           "
                    />
                </div>
                <div className="flex flex-col justify-between w-full">
                    <div className=" flex flex-col gap-2">
                        <ReactMarkdown className="text-xl font-semibold mb-4">Profile</ReactMarkdown>
                        <ReactMarkdown
                            className="text-md text-gray-900">{session.data?.user?.name as string}</ReactMarkdown>
                        <ReactMarkdown
                            className="text-sm text-gray-500 mb-4">{session.data?.user?.email as string}</ReactMarkdown>
                    </div>
                    <div className="mt-6 w-full">
                        <Button fullWidth onClick={() => signOut()}>Log out</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;