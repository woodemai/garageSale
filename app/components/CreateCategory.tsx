'use client';
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import ReactMarkdown from "react-markdown";

const CreateItem = () => {
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
            image: ''
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/category', data)
            .then(() => toast.success("Category created!"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="bg-white rounded-md p-4 ">
            <ReactMarkdown
                className="
                                text-left
                                mb-4
                                text-xl
                                tracking-tight
                                font-bold
                            "
            >
                Create category
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
                <Input disabled={isLoading} label="Choose image" id="image" register={register} errors={errors}
                       type='text'
                       placeholder="Image URL"/>
                <Button disabled={isLoading} fullWidth type='submit'>Create</Button>
            </form>
        </div>
    );
};

export default CreateItem;