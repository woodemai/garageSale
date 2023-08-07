'use client'
import React, {FC} from "react";
import Modal from "@/app/components/UI/Modal";
import Image from "next/image";

interface ImageModalProps{
    isOpen: boolean,
    onClose: () => void,
    imageUrl: string
}
const ImageModal:FC<ImageModalProps> = ({
    isOpen,
    onClose,
    imageUrl
                                        }) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className="h-96 m-96 max-h-screen">
                <Image
                    src={imageUrl}
                    alt={'image'}
                    className="object-cover z-1"
                    fill
                />
            </div>
        </Modal>
    );
};
export default ImageModal;