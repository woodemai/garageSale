import {IconType} from "react-icons";
import {FC} from "react";

interface AuthSocialButtonProps {
    onClick: () => void,
    icon: IconType,
}

const AuthSocialButton:FC<AuthSocialButtonProps> = ({
    icon:Icon,
    onClick,
                                                    }) => {
    return (
        <button
        type='button'
        onClick={onClick}
        className="
            inline-flex
            w-full
            justify-center
            rounded-md
            bg-white
            px-4
            py-2
            text-gray-500
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            hover:bg-gray-200
            focus:outline-offset-0
            transition-all duration-100
        "
        >
            <Icon/>
        </button>
    );
};

export default AuthSocialButton;