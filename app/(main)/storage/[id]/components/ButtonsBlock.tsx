'use client';
import Button from "@/app/components/UI/Button";
import {useRouter} from "next/navigation";
import {Item} from "@prisma/client";
import {FC} from "react";
interface ButtonBlockProps {
    item:Item
}
const ButtonsBlock:FC<ButtonBlockProps> = ({
    item
                                           }) => {
    const router = useRouter()
    const handleEdit = () => {
        router.push(`/edit-item/${item.id}`)
    };

    const handleDelete = () => {
        router.push(`/delete-item/${item.id}`)
    };
    return (
        <div
            className="
                flex
                flex-col
                gap-2
            "
        >
            <Button fullWidth onClick={handleEdit}>Edit</Button>
            <Button fullWidth danger secondary onClick={handleDelete}>Delete</Button>
        </div>
    );
};

export default ButtonsBlock;