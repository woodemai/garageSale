'use client';
import {FC, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import ReactMarkdown from "react-markdown";
import Select from "@/app/components/UI/Select";
import {Category} from "@prisma/client";
import {useSession} from "next-auth/react";

interface CreateItemProps {
    categories: Category[]
}

const CreateItem: FC<CreateItemProps> = ({
                                             categories
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
            name: '',
            description: '',
            quantity: 0,
            image: ''
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/item', {...data, email})
            .then(() => toast.success("Item created!"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="bg-white rounded-md p-4">
            <ReactMarkdown
                className="
                                text-left
                                mb-4
                                text-xl
                                tracking-tight
                                font-bold
                            "
            >
                Create item
            </ReactMarkdown>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    flex-col
                    gap-4

                "
            >
                <Input disabled={isLoading} label="Name" id="name" register={register} errors={errors}
                       placeholder="Name" required/>
                <Input disabled={isLoading} label="Description" id="description" register={register} errors={errors}
                       placeholder="Description" required/>
                <Input disabled={isLoading} label="Quantity" id="quantity" register={register} errors={errors}
                       type="number"
                       placeholder="1" required/>
                <Input disabled={isLoading} label="Choose image" id="image" register={register} errors={errors}
                       type='text'
                       placeholder="Image URL"/>
                <Select
                    items={categories}
                    optionTitle={(category: Category) => category.name}
                    optionValue={(category: Category) => category.id}
                    title="Category"
                    register={register}
                    errors={errors}
                    required
                    disabled={isLoading}
                    id={'categoryId'}
                    placeholder={"Choose a category"}
                />
                <Button disabled={isLoading} fullWidth type='submit'>Create</Button>
            </form>
        </div>
    );
};

export default CreateItem;