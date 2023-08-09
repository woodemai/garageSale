'use client';
import {FC, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/buttons/Button";
import ReactMarkdown from "react-markdown";
import Select from "@/app/components/UI/Select";
import {Category} from "@prisma/client";
import {useSession} from "next-auth/react";
import {CldUploadButton} from "next-cloudinary";
import {HiPhoto} from "react-icons/hi2";
import Image from "next/image";
import {useTranslations} from "next-intl";

interface CreateItemProps {
    categories: Category[]
}

const ItemCreate: FC<CreateItemProps> = ({
                                             categories
                                         }) => {
    const t = useTranslations('createItemBlock');
    const session = useSession()
    const email = session.data?.user?.email as string;
    const [imageUrl, setImageUrl] = useState<string>('');
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
        axios.post('/api/item', {...data, email, imageUrl})
            .then(() => toast.success(t(`success`)))
            .catch(() => toast.error(t('error')))
            .finally(() => setIsLoading(false))
    }
    const handleImageUpload = (result: any) => {
        setImageUrl(result?.info?.secure_url)
    }
    return (
        <div className="bg-white rounded-lg w-full sm:max-w-md p-4 dark:bg-gray-900 dark:text-gray-100">
            <ReactMarkdown
                className="
                                text-left
                                mb-4
                                text-xl
                                tracking-tight
                                font-bold
                            "
            >
                {t('title')}
            </ReactMarkdown>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    flex-col
                    gap-4

                "
            >
                <Input disabled={isLoading} label={t('name')} id="name" register={register} errors={errors}
                       placeholder={t('name')} required/>
                <Input disabled={isLoading} label={t('description')} id="description" register={register}
                       errors={errors}
                       placeholder={t('description')} required/>
                <Input disabled={isLoading} label={t('quantity')} id="quantity" register={register} errors={errors}
                       type="number"
                       placeholder="1" required/>
                <Select
                    items={categories}
                    optionTitle={(category: Category) => category.name}
                    optionValue={(category: Category) => category.id}
                    title={t('category')}
                    register={register}
                    errors={errors}
                    required
                    disabled={isLoading}
                    id={'categoryId'}
                    placeholder={t('choose')}
                />
                <CldUploadButton
                    options={{maxFiles: 1}}
                    onUpload={handleImageUpload}
                    uploadPreset='fkkcjhmy'
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
                            className="text-xs ">{imageUrl === '' ? t('choose') : t('another')}</ReactMarkdown>
                    </div>
                </CldUploadButton>
                <Button disabled={isLoading} fullWidth type='submit'>{t('create')}</Button>
            </form>
        </div>
    );
};

export default ItemCreate;