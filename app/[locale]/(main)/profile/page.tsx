'use client';
import React, {useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/UI/buttons/Button";
import ReactMarkdown from "react-markdown";
import ImageModal from "@/app/components/UI/ImageModal";
import {useTranslations} from "next-intl";
import {RxAvatar} from "react-icons/rx";

const Profile = () => {
    const t = useTranslations('profile');
    const session = useSession();
    const [isImageOpen, setIsImageOpen] = useState(false);
    return (
        <div className="flex justify-center items-center w-full">
            <ImageModal isOpen={isImageOpen} onClose={() => setIsImageOpen(false)}
                        imageUrl={session.data?.user?.image as string}/>
            <div
                className=" text-center
                        sm:text-left
                        flex
                        flex-col
                        gap-4
                        justify-center
                        sm:justify-between
                        items-center
                        w-full
                        sm:max-w-sm
                        rounded-b-xl
                        sm:rounded-xl
                        bg-white
                        dark:bg-gray-900
                        text-gray-900
                        dark:text-gray-100
                        p-4">
                <ReactMarkdown className="text-xl font-semibold mb-4">{t('title')}</ReactMarkdown>
                <div className="flex flex-col sm:flex-row w-full ">
                    <div className="overflow-hidden flex sm:justify-between w-full gap-4 justify-center"
                         onClick={() => setIsImageOpen(true)}>
                        <div className="w-full h-full flex justify-center items-center">
                            {session.data?.user?.image ? <Image
                                    src={session.data?.user?.image as string}
                                    width={256}
                                    height={256}
                                    alt={'Avatar'}
                                    className="
                                rounded-full
                                object-cover
                                w-32
                                h-32
                           "
                                />
                                : <RxAvatar size={128}/>}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center sm:justify-start gap-4 mt-4 sm:mt-0 items-center sm:items-start w-full">
                        <div className=" flex flex-col gap-2 px-3">
                            <ReactMarkdown
                                className="text-md">{session.data?.user?.name as string}</ReactMarkdown>
                            <ReactMarkdown
                                className="text-sm text-gray-500">{session.data?.user?.email as string}</ReactMarkdown>
                        </div>
                        <Button secondary onClick={() => signOut()}>{t('signOut')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;