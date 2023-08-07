'use client';
import Modal from "@/app/components/UI/Modal";
import ItemEdit from "@/app/components/item/ItemEdit";
import {Category, Item} from "@prisma/client";
import {FC} from "react";

interface EditItemModal {
    categories: Category[],
    item: Item,
    isOpen: boolean,
    onClose: () => void
}
const EditItemModal:FC<EditItemModal> = ({
    categories,
    item,
    isOpen,
    onClose,
                                         }) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ItemEdit categories={categories} item={item}/>
        </Modal>
    );
};

export default EditItemModal;