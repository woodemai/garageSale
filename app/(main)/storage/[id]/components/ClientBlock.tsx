'use client';
import React, {FC, useState} from 'react';
import {Category, Item, User} from "@prisma/client";
import EditItemModal from "@/app/(main)/storage/[id]/components/EditItemModal";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import DeleteItemModal from "@/app/(main)/storage/[id]/components/DeleteItemModal";
import ButtonBack from "@/app/components/UI/ButtonBack";
import {format} from "date-fns";
import ImageModal from "@/app/(main)/storage/[id]/components/ImageModal";
interface ClientBlockProps {
    categories: Category[],
    item: Item,
    category: Category,
    user: User
}
const ClientBlock:FC<ClientBlockProps> = ({
    categories,
    item,
    category,
    user
                                          }) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalImageOpen, setIsModalImageOpen] = useState(false);
    return (
        <>
            <EditItemModal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} item={item} categories={categories}/>
            <DeleteItemModal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} item={item}/>
            <ImageModal isOpen={isModalImageOpen} onClose={() => setIsModalImageOpen(false)} imageUrl={item.image}/>
            <div
                className="
                    flex
                    flex-col
                    gap-6
                    justify-center
                    items-center
                    w-full
                "
            >
                <div
                    className="
                    flex
                    flex-col
                    gap-2
                    p-4
                    rounded-lg
                    bg-white
                    text-gray-500
                    w-1/2
                "
                >
                    <div className="flex flex-row justify-between">
                        <div>
                            <ButtonBack/>
                            <ReactMarkdown
                                className="text-xl font-bold">{item.name + " - " + String(item.quantity)}</ReactMarkdown>
                            <ReactMarkdown className="text-xs mb-2">{category.description}</ReactMarkdown>
                            <ReactMarkdown>{item.description}</ReactMarkdown>
                            <ReactMarkdown className="text-xs text-sky-500 mt-10">{`${user.name} ${format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}`}</ReactMarkdown>
                        </div>
                        {(item.image && item.image !== '') &&
                            <div className="w-fit overflow-hidden rounded-md" onClick={() => setIsModalImageOpen(true)}>
                                <Image
                                    src={item.image}
                                    alt={'image'}
                                    width={192}
                                    height={192}
                                    className="
                                shadow-sm
                                object-cover
                                hover:scale-110
                                cursor-pointer
                                transition
                                translate
                            "
                                />
                            </div>}
                    </div>
                    <div
                        className="
                                    flex
                                    flex-col
                                    gap-2
                                "
                    >
                        <Button fullWidth onClick={() => setIsModalEditOpen(true)}>Edit</Button>
                        <Button fullWidth danger onClick={() => setIsModalDeleteOpen(true)}>Delete</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientBlock;