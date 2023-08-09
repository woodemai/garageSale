'use client';
import {FC, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/buttons/Button";
import ReactMarkdown from "react-markdown";
import Select from "@/app/components/UI/Select";
import {Category, Item} from "@prisma/client";
import {useSession} from "next-auth/react";
import {CldUploadButton} from "next-cloudinary";
import {HiPhoto} from "react-icons/hi2";
import Image from "next/image";

interface CreateItemProps {
    categories: Category[],
    item: Item
}

const ItemCreate: FC<CreateItemProps> = ({
                                             categories,
                                             item
                                         }) => {
    const session = useSession()
    const email = session.data?.user?.email as string;
    const [imageUrl, setImageUrl] = useState<string>(item.image);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            image: item.image
        }
    })
    const {id} = item;
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.put('/api/item', {...data, email, imageUrl, id})
            .then(() => toast.success("Item updated!"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false))
    }
    const handleImageUpload = (result: any) => {
        setImageUrl(result?.info?.secure_url)
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
                Edit
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
                    defaultValue={item.categoryId ? item.categoryId : ''}
                />
                <CldUploadButton
                    options={{maxFiles: 1}}
                    onUpload={handleImageUpload}
                    uploadPreset='fkkcjhmy'
                    className="
                        flex
                        flex-row
                        gap-4
                        items-end
                    "
                >
                    {imageUrl !== '' ?
                        <div>
                            <Image
                                src={imageUrl}
                                alt={'uploadedImage'}
                                width={96}
                                height={96}
                                className="
                                rounded-md
                            "
                            />
                        </div>
                        : <></>
                    }

                    <div className="
                            flex
                            flex-row
                            gap-2
                            text-sky-500
                            items-end
                            hover:text-gray-700
                            transition-all
                            durantion-100
                            flex-nowrap
                            mt-6
                       "
                    >
                        <HiPhoto className="text-xl ml-1"/>
                        <ReactMarkdown
                            className="text-xs ">{imageUrl === '' ? 'Choose a photo' : 'Choose another photo'}</ReactMarkdown>
                    </div>
                </CldUploadButton>
                <Button disabled={isLoading} fullWidth type='submit'>Save changes</Button>
            </form>
        </div>
    );
};

export default ItemCreate;