'use client';

import {useCallback, useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/UI/Input";
import Button from "@/app/components/UI/Button";
import AuthSocialButton from "@/app/[locale]/(site)/components/AuthSocialButton";
import {BsDiscord, BsGithub, BsGoogle} from "react-icons/bs";
import {LiaYandexInternational} from "react-icons/lia";
import axios from 'axios';
import {toast} from "react-hot-toast";
import {signIn, useSession} from 'next-auth/react';
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

type Variant = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/main')
        }
    }, [session?.status, router]);
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const t = useTranslations('authForm');
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', {...data, redirect: true}))
                .catch(() => toast.error(t('error')))
                .finally(() => setIsLoading(false));
        }
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: true
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error(t('invalid'));
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success(t('success'));
                    }
                }).finally(() => setIsLoading(false));
        }
    }
    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {redirect: true})
            .then((callback) => {
                if (callback?.error) {
                    toast.error(t('invalid'));
                }
                if (callback?.ok && !callback?.error) {
                    toast.success(t('success'));
                }
            }).finally(() => setIsLoading(false));
    }
    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10
            "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label={t('name')}
                            type="text"
                            placeholder={t('placeholderName')}
                            errors={errors}
                            register={register}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label={t('email')}
                        type="email"
                        placeholder={t('placeholderEmail')}
                        errors={errors}
                        register={register}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label={t('password')}
                        type="password"
                        placeholder={t('password')}
                        errors={errors}
                        register={register}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"

                        >
                            {variant === 'LOGIN' ? t('signIn') : t('register')}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div className="
                                    w-full
                                    border-t
                                    border-gray-300
                                "
                            />
                        </div>
                        <div className="
                                    relative
                                    flex
                                    justify-center
                                    text-sm
                                "
                        >
                                <span
                                    className="
                                        bg-white
                                        px-2
                                        text-gray-500
                                    "
                                >
                                    {t('continue')}
                                </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                        <AuthSocialButton
                            icon={LiaYandexInternational}
                            onClick={() => socialAction('yandex')}
                        />
                        <AuthSocialButton
                            icon={BsDiscord}
                            onClick={() => socialAction('discord')}
                        />
                    </div>
                </div>
                <div
                    className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                >
                    <div>{variant === 'LOGIN' ? t('new') : t('have')}</div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer hover:text-gray-900 transition-all duration-200"
                    >
                        {variant === 'LOGIN' ? t('create') : t('login')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;