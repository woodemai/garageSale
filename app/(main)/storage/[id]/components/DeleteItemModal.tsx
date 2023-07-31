'use client';
import Modal from "@/app/components/UI/Modal";
import {Item} from "@prisma/client";
import {FC} from "react";
import ItemDelete from "@/app/components/item/ItemDelete";

interface DeleteItemModal {
    item: Item,
    isOpen: boolean,
    onClose: () => void
}

const DeleteItemModal: FC<DeleteItemModal> = ({
                                                  item,
                                                  isOpen,
                                                  onClose
                                              }) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ItemDelete item={item}/>
        </Modal>
    );
};

export default DeleteItemModal;