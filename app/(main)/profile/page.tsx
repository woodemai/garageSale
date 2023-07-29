'use client';
import React from 'react';
import {useSession} from "next-auth/react";
import Image from "next/image";

const Page = () => {
    const session = useSession();
    return (
        <div className="
                flex
                flex-col
                gap-2
                m-6
            "
        >
            <p className="
                    text-xl
                    font-bold
                "
            > Profile</p>
            <p>Name: {session.data?.user?.name}</p>
            <p>Email: {session.data?.user?.email}</p>
            <Image
                src={session.data?.user?.image as string}
                width={100}
                height={100}
                alt={'avatar'}
                className="
                    rounded-full
                "
            />
        </div>
    );
};

export default Page;