'use client';
import {FC, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/app/components/UI/Input";
import {useSession} from "next-auth/react";
import {BiSend} from "react-icons/bi";

interface CreateItemProps {
    itemId: string
}

const CreateCommentForm: FC<CreateItemProps> = ({
                                                    itemId
                                                }) => {
    const session = useSession()
    const email = session.data?.user?.email as string;
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            body: '',
            itemId: itemId,
            userEmail: email
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/comment', {...data})
            .then(() => toast.success("Message sent"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="bg-white p-2 rounded-lg sm:max-w-md my-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    flex-row
                    items-center
                    flex-nowrap
                    gap-4
                    w-full
                "
            >
                <div className="w-full">
                    <Input disabled={isLoading} id="body" fullWidth register={register} errors={errors}
                           placeholder="Start typing..." required/>
                </div>
                <button type='submit' className="text-xl" disabled={isLoading}><BiSend/></button>
            </form>
        </div>
    );
};

export default CreateCommentForm;