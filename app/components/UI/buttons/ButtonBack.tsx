'use client';
import {BiArrowBack} from "react-icons/bi";
import {useRouter} from "next/navigation";
const ButtonBack = () => {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className="
                hover:text-gray-900
                transition-all durantion-100
                w-min
                text-xl
                p-1
                mb-2
            "
        >
            <BiArrowBack/>
        </button>
    );
};

export default ButtonBack;