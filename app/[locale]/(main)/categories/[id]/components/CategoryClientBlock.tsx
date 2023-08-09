'use client';
import {Category, Item} from "@prisma/client";
import React, {FC, useState} from "react";
import ButtonBack from "@/app/components/UI/buttons/ButtonBack";
import ReactMarkdown from "react-markdown";
import CategoryEditModal from "@/app/[locale]/(main)/categories/[id]/components/CategoryEditModal";
import CategoryDeleteModal from "@/app/[locale]/(main)/categories/[id]/components/CategoryDeleteModal";
import Button from "@/app/components/UI/buttons/Button";
import {useTranslations} from "next-intl";

interface CategoryClientBlockProps {
    category: Category & { items: Item[] },
}

const CategoryClientBlock: FC<CategoryClientBlockProps> = ({
                                                               category,
                                                           }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const t = useTranslations('categoryId')
    return (
        <>
            <CategoryEditModal category={category} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}/>
            <CategoryDeleteModal category={category} isOpen={isDeleteModalOpen}
                                 onClose={() => setIsDeleteModalOpen(false)}/>
            <div
                className={`
                    flex
                    flex-col
                    gap-4
                    p-4
                    rounded-b-lg
                    sm:rounded-lg
                    text-gray-500
                    w-full
                    sm:max-w-2xl
                    bg-white
                    dark:bg-gray-900
                    dark:text-gray-100
                `}
            >

                <ButtonBack/>
                <ReactMarkdown
                    className="text-xl font-bold">{category.name + " - " + String(category.items.length)}</ReactMarkdown>
                <ReactMarkdown className="text-xs mb-2">{category.description}</ReactMarkdown>
                <div
                    className="
                                    flex
                                    flex-col
                                    sm:flex-row
                                    justify-between
                                    gap-2
                                "
                >
                    <Button fullWidth onClick={() => setIsEditModalOpen(true)}>{t('edit')}</Button>
                    <Button fullWidth danger onClick={() => setIsDeleteModalOpen(true)}>{t('delete')}</Button>
                </div>
            </div>
        </>
    );
}
export default CategoryClientBlock;