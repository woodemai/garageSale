'use client';
import {Category} from "@prisma/client";
import {FC, useState} from "react";
import Modal from "@/app/components/UI/Modal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import {PiWarningLight} from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import Button from "@/app/components/UI/buttons/Button";
import {useRouter} from "next/navigation";

interface CategoryDeleteModalProps {
    category: Category,
    isOpen: boolean,
    onClose: () => void,
}

const CategoryDeleteModal: FC<CategoryDeleteModalProps> = ({
                                                               category,
                                                               isOpen,
                                                               onClose
                                                           }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const {
        handleSubmit,
    } = useForm<FieldValues>()
    const {id} = category;
    const onSubmit: SubmitHandler<FieldValues> = () => {
        setIsLoading(true)
        axios.delete(`/api/category/${id}`)
            .then(() => toast.success("Category deleted!"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => router.push('/storage'))
    }
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className="bg-white rounded-md py-2 px-2">
                <div className="
                    flex
                    flex-row
                    gap-4
                    justify-start
                "
                >
                    <div className="
                        text-rose-600
                        bg-rose-200
                        rounded-full
                        p-2
                        h-fit
                        flex
                        justify-center
                        items-center
                    "
                    >
                        <PiWarningLight size={24}/>
                    </div>
                    <div>
                        <ReactMarkdown
                            className="
                    font-semibold
                    text-lg
                    text-left
                    text-gray-900
                    mb-2
                "
                        >
                            Delete category
                        </ReactMarkdown>
                        <ReactMarkdown
                            className="
                    text-gray-500
                    text-sm
                    text-left
                    mb-6
                "
                        >
                            Are you sure to delete the category, this action cannot be undone
                        </ReactMarkdown>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="
                    flex
                    flex-col
                    gap-4

                "
                >
                    <Button disabled={isLoading} danger type='submit'>Yes, delete</Button>
                </form>
            </div>
        </Modal>
    )
}
export default CategoryDeleteModal;