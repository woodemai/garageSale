'use client';
import {IoClose} from "react-icons/io5";
import {FC} from "react";
interface ButtonCloseProps {
    onClick: () => void
}
const ButtonClose:FC<ButtonCloseProps> = ({
                                            onClick
                                        }) => {
    return (
        <button
            onClick={onClick}
            className="
                hover:text-gray-900
                transition-all durantion-100
                w-min
                text-xl
                p-1
                mb-2
            "
        >
            <IoClose/>
        </button>
    );
};

export default ButtonClose;