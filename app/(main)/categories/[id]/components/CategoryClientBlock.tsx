'use client';
import {Category, Item} from "@prisma/client";
import React, {FC, useState} from "react";
import ButtonBack from "@/app/components/UI/ButtonBack";
import ReactMarkdown from "react-markdown";
import CategoryEditModal from "@/app/(main)/categories/[id]/components/CategoryEditModal";
import CategoryDeleteModal from "@/app/(main)/categories/[id]/components/CategoryDeleteModal";
import Button from "@/app/components/UI/Button";

interface CategoryClientBlockProps {
    category: Category,
    items: Item[],
}

const CategoryClientBlock: FC<CategoryClientBlockProps> = ({
                                                               category,
                                                               items
                                                           }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
                    rounded-md
                    text-gray-500
                    w-2/3
                    bg-white
                `}
            >

                <ButtonBack/>
                <ReactMarkdown
                    className="text-xl font-bold">{category.name + " - " + String(items.length)}</ReactMarkdown>
                <ReactMarkdown className="text-xs mb-2">{category.description}</ReactMarkdown>
                <div
                    className="
                                    flex
                                    flex-row
                                    justify-between
                                    gap-2
                                "
                >
                    <Button fullWidth onClick={() => setIsEditModalOpen(true)}>Edit</Button>
                    <Button fullWidth danger onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
                </div>
            </div>
        </>
    );
}
export default CategoryClientBlock;