'use client';
import {FC, ReactNode} from "react";
import ButtonBack from "@/app/components/UI/ButtonBack";

interface ModalProps {
    children: ReactNode,
}

const Modal: FC<ModalProps> = ({
                                   children,

                               }) => {
    return (
        <div
            className="
                flex
                justify-center
                items-center
                absolute
                top-0
                left-0
                w-full
                h-full
                bg-gray-200 bg-opacity-20
                backdrop-blur-sm
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-2
                    bg-white
                    rounded-md
                    min-w-max
                    p-4
                    shadow-md
                    m-8
                "
            >
                <div>
                    <div
                        className="
                            flex
                            flex-row-reverse
                            justify-between
                            items-center
                            p-1
                            m-1
                            w-full
                        "
                    >
                        <ButtonBack/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;