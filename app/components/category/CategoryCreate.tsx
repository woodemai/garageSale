'use client';
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/buttons/Button";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {HiPhoto} from "react-icons/hi2";
import {CldUploadButton} from "next-cloudinary";
import {useTranslations} from "next-intl";

const CreateItem = () => {
    const t = useTranslations('createCategoryBlock');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
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
    const handleImageUpload = (result: any) => {
        setImageUrl(result?.info?.secure_url)
    }
    return (
        <div
            className="
                bg-white
                dark:bg-gray-900
                rounded-md
                p-4
                w-full
                sm:max-w-sm
            "
        >
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
                            className="text-xs ">{imageUrl === '' ? t('photo') : t('another')}</ReactMarkdown>
                    </div>
                </CldUploadButton>
                <Button disabled={isLoading} fullWidth type='submit'>{t('create')}</Button>
            </form>
        </div>
    );
};

export default CreateItem;