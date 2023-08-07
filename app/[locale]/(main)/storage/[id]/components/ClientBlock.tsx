'use client';
import React, {FC, useState} from 'react';
import {Category, Comment, Item, User} from "@prisma/client";
import EditItemModal from "@/app/[locale]/(main)/storage/[id]/components/EditItemModal";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import DeleteItemModal from "@/app/[locale]/(main)/storage/[id]/components/DeleteItemModal";
import ButtonBack from "@/app/components/UI/ButtonBack";
import {format} from "date-fns";
import ImageModal from "@/app/components/UI/ImageModal";
import CommentList from "@/app/components/UI/CommentList";
import CreateCommentForm from "@/app/[locale]/(main)/storage/[id]/components/CreateCommentForm";
import {useTranslations} from "next-intl";

interface ClientBlockProps {
    categories: Category[],
    item: Item & {
        category: Category | null,
        user: User | null,
        comments: (Comment & { sender: User })[]
    }
}

const ClientBlock: FC<ClientBlockProps> = ({
                                               categories,
                                               item,
                                           }) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalImageOpen, setIsModalImageOpen] = useState(false);
    const t = useTranslations('item');
    return (
        <>
            <EditItemModal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} item={item}
                           categories={categories}/>
            <DeleteItemModal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} item={item}/>
            <ImageModal isOpen={isModalImageOpen} onClose={() => setIsModalImageOpen(false)} imageUrl={item.image}/>
            <div className="
                    flex
                    flex-col
                    gap-2
                    sm:p-0
                    rounded-lg
                    w-full
                    ">
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
                                    mb-4
                                "
                >
                    <Button fullWidth onClick={() => setIsModalEditOpen(true)}>{t('edit')}</Button>
                    <Button fullWidth danger onClick={() => setIsModalDeleteOpen(true)}>{t('delete')}</Button>
                </div>
                <CreateCommentForm itemId={item.id}/>
            </div>
            {item.comments &&
                <CommentList title={t('comments')} items={item.comments} noItemsErrorMessage={t('noComments')}/>}
        </>
    );
};

export default ClientBlock;