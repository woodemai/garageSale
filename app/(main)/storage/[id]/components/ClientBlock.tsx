'use client';
import React, {FC, useState} from 'react';
import {Category, Comment, Item, User} from "@prisma/client";
import EditItemModal from "@/app/(main)/storage/[id]/components/EditItemModal";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import DeleteItemModal from "@/app/(main)/storage/[id]/components/DeleteItemModal";
import ButtonBack from "@/app/components/UI/ButtonBack";
import {format} from "date-fns";
import ImageModal from "@/app/components/UI/ImageModal";
import CommentList from "@/app/components/UI/CommentList";
import CreateCommentForm from "@/app/(main)/storage/[id]/components/CreateCommentForm";

interface ClientBlockProps {
    categories: Category[],
    item: Item & {
        category: Category | null,
        user: User | null,
        comments: (Comment & { sender: User })[] }
}

const ClientBlock: FC<ClientBlockProps> = ({
                                               categories,
                                               item,
                                           }) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalImageOpen, setIsModalImageOpen] = useState(false);
    return (
        <>
            <EditItemModal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} item={item}
                           categories={categories}/>
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
                    mb-20
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
                    w-full
                    sm:max-w-xl
                "
                >
                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                        <div>
                            <ButtonBack/>
                            <ReactMarkdown
                                className="text-xl font-bold">{item.name + " - " + String(item.quantity)}</ReactMarkdown>
                            {item.category &&
                                <ReactMarkdown className="text-xs mb-2">{item.category.description}</ReactMarkdown>}
                            <ReactMarkdown>{item.description}</ReactMarkdown>
                            {item.user && <ReactMarkdown
                                className="text-xs text-sky-500 sm:mt-10">
                                {`${item.user.name} ${format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}`}
                            </ReactMarkdown>}
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
                    <CreateCommentForm itemId={item.id}/>
                    {item.comments && <CommentList items={item.comments} noItemsErrorMessage="No comments"/>}
                </div>
            </div>
        </>
    );
};

export default ClientBlock;