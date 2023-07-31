'use client';
import {FC, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Button from "@/app/components/UI/Button";
import ReactMarkdown from "react-markdown";
import {Item} from "@prisma/client";
import {router} from "next/client";
interface CreateItemProps {
    item: Item
}

const ItemCreate: FC<CreateItemProps> = ({
                                             item
                                         }) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        handleSubmit,
    } = useForm<FieldValues>()
    const {id} = item;
    const onSubmit: SubmitHandler<FieldValues> = () => {
        setIsLoading(true)
        axios.delete(`/api/item/${id}`)
            .then(() => toast.success("Item deleted!"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => router.push('/storage'))
    }
    return (
        <div className="bg-white rounded-md py-2 px-4">
            <ReactMarkdown
                className="
                                text-left
                                mb-4
                                text-xl
                                tracking-tight
                                font-bold
                            "
            >
                {"Are you sure you want to delete " + item.name + "?"}
            </ReactMarkdown>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    flex-col
                    gap-4

                "
            >
                <Button disabled={isLoading} danger fullWidth type='submit'>Yes, delete</Button>
            </form>
        </div>
    );
};

export default ItemCreate;