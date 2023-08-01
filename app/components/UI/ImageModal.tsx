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
            <div className="w-fit overflow-hidden rounded-md">
                <Image
                    src={imageUrl}
                    alt={'image'}
                    width={512}
                    height={512}
                    className="
                                shadow-sm
                                object-cover
                                hover:scale-110
                                cursor-pointer
                                transition
                                translate
                            "
                />
            </div>
        </Modal>
    );
};
export default ImageModal;