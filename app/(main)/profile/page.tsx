'use client';
import React, {useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import ReactMarkdown from "react-markdown";
import ImageModal from "@/app/components/UI/ImageModal";

const Page = () => {
    const session = useSession();
    const [isImageOpen, setIsImageOpen] = useState(false);
    return (
        <div className="flex justify-center items-center w-full">
            <ImageModal isOpen={isImageOpen} onClose={() => setIsImageOpen(false)}
                        imageUrl={session.data?.user?.image as string}/>
            <div
                className=" text-center sm:text-left flex flex-col gap-4 justify-center sm:justify-between items-center w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-wxl 2xl:max-w-2xl rounded-lg bg-white p-4">
                <ReactMarkdown className="text-xl font-semibold mb-4">Profile</ReactMarkdown>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="overflow-hidden flex sm:justify-between w-full gap-4 justify-center" onClick={() => setIsImageOpen(true)}>
                        <Image
                            src={session.data?.user?.image as string}
                            width={96}
                            height={96}
                            alt={'avatar'}
                            className="
                                rounded-full
                                object-cover
                           "
                        />
                    </div>
                    <div className="flex flex-col justify-start gap-4 mt-4 sm:mt-0 w-full">
                        <div className=" flex flex-col gap-2">
                            <ReactMarkdown
                                className="text-md text-gray-900">{session.data?.user?.name as string}</ReactMarkdown>
                            <ReactMarkdown
                                className="text-sm text-gray-500">{session.data?.user?.email as string}</ReactMarkdown>
                        </div>
                        <div className=" flex-none w-full">
                            <Button secondary fullWidth onClick={() => signOut()}>Log out</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;