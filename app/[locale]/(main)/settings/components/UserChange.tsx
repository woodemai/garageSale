'use client';
import ReactMarkdown from "react-markdown";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useTranslations} from "next-intl";
import axios from "axios";
import Input from "@/app/components/UI/Input";
import Image from "next/image";
import Button from "@/app/components/UI/buttons/Button";
import {CldUploadButton} from "next-cloudinary";
import {HiOutlineUpload} from "react-icons/hi";
import {toast} from "react-hot-toast";
import clsx from "clsx";

const UserChange = () => {
    const [isLoading, setIsLoading] = useState(false);
    const session = useSession()
    const [user, setUser] = useState(session.data?.user);
    useEffect(() => {
        setUser(session.data?.user)
    }, [session, session.data, session.data?.user]);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: user?.name,
            image: user?.image,
            email: user?.email,
            oldPassword: "",
            password: "",
            passwordConfirm: "",
        }
    })
    const image = watch("image")
    const password = watch("password")
    const passwordConfirm = watch("passwordConfirm");

    const uppercaseRegex = /[A-Z]/;
    const specialCharsRegex = /[^A-Za-z0-9]/;
    const passwordValid = () => {
        return ((password.length > 5
            && uppercaseRegex.test(password)
            && specialCharsRegex.test(password)) || password !== "");
    }
    const handleImageUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
        console.log(image)
    };
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        const oldEmail = user?.email;
        axios.put('/api/user', {...data, oldEmail})
            .then(() => toast.success(t('success')))
            .catch((error: any) => {
                if (error.response.status === 400) {
                    toast.error(t('passwordErrorToast'))
                } else toast.error(t('error'))
            })
            .finally(() => setIsLoading(false));
    }
    const t = useTranslations('userChange')
    return (
        <div
            className="
                border-t-gray-300
                dark:border-t-gray-500
                border-t
                flex
                flex-col
                justify-start
                gap-4
                bg-white
                dark:bg-gray-900
                px-8
                py-4
                sm:rounded-xl
                sm:border-t-0
            "
        >
            <ReactMarkdown>{t('title')}</ReactMarkdown>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input id="name" disabled={isLoading} register={register} errors={errors} label={t('name')}/>
                <Input id="email" disabled={isLoading} register={register} errors={errors} label={t('email')}
                       type="email"/>
                <div className="flex flex-col gap-y-4">
                    <Input id="oldPassword" disabled={isLoading} register={register} errors={errors}
                           label={t('oldPassword')} type="password"/>
                    <div>
                        <div
                            className={clsx(
                                `bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-gray-900 dark:text-gray-100 mb-2 text-xs transition-all duration-100`,
                                !passwordValid() && "hidden")}
                        >
                            <ReactMarkdown className="mb-4">
                                {t('passwordInvalid')}
                            </ReactMarkdown>
                            <ul className="flex flex-col gap-y-1">
                                <li className={clsx(password.length > 5 ? "text-green-500" : "text-rose-500")}>
                                    {t('passwordErrorCharacters')}</li>
                                <li className={clsx(uppercaseRegex.test(password) ? "text-green-500" : "text-rose-500")}>
                                    {t('passwordErrorUppercase')}</li>
                                <li className={clsx(specialCharsRegex.test(password) ? "text-green-500" : "text-rose-500")}>
                                    {t('passwordErrorSymbol')}</li>
                            </ul>
                        </div>
                        <Input id="password" disabled={isLoading} register={register} errors={errors}
                               label={t('password')} type="password"/>
                    </div>
                    <div>
                        <div
                            className={clsx(
                                `bg-gray-100 dark:bg-gray-800  rounded-md p-3 text-rose-500 text-xs mb-2 mt-4 transition-all duration-100`,
                                (password === passwordConfirm || passwordConfirm === "") && "hidden")}
                        >
                            <ReactMarkdown>{t('confirmPasswordError')}</ReactMarkdown>
                        </div>
                        <Input id="passwordConfirm" disabled={isLoading} register={register} errors={errors}
                               label={t('confirmPassword')} type="password"/>
                    </div>
                </div>
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
                    {user && (image || user.image)
                        ? <div className="w-full h-fit flex justify-center">
                            <Image src={image || user.image} alt="User avatar" width={256} height={256}
                                   className="rounded-md"/>
                        </div>
                        : <div className="flex justify-center items-center w-full">
                            <div className="flex flex-col justify-center items-center gap-y-4 w-full h-48 sm:w-60 sm:h-60 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 rounded-md p-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:ring-gray-700 dark:hover:ring-gray-300 transition-all duration-200
                        text-xs">
                                <HiOutlineUpload size={64}/>
                                <ReactMarkdown>{t('selectPhoto')}</ReactMarkdown>
                            </div>
                        </div>}
                </CldUploadButton>
                <Button disabled={isLoading || password !== passwordConfirm} type="submit">{t('save')}</Button>
            </form>
        </div>
    );
};
export default UserChange;