import AuthForm from './components/AuthForm';
import Image from "next/image";
import {getTranslator} from "next-intl/server";

export default async function Home({
                                       params: {locale}
                                   }:
                                       {
                                           params: { locale: string }
                                       }) {
    const dict = await getTranslator(locale, 'main');
    return (
        <div
            className="
            flex
            min-h-full
            flex-col
            justify-center
            py-12
            sm:px-6
            lg:px-8
            bg-gray-100
            "
        >
            <div
                className="
                sm:mx-auto
                sm:w-full
                sm:max-w-md
                "
            >
                <Image
                    src='/images/logo.svg'
                    alt='logo'
                    width="48"
                    height="48"
                    className='mx-auto'
                />
            </div>
            <h2
                className="
                mt-6
                text-center
                text-3xl
                font-bold
                tracking-tight
                text-gray-900
            "
            >
                {dict('SignIn')}
            </h2>
            <AuthForm/>
        </div>
    )
}
