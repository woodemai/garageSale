'use client';
import clsx from "clsx";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {FC} from "react";

interface InputProps {
    label?: string,
    id: string,
    type?: string,
    required?: boolean,
    fullWidth?: boolean
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
    placeholder?: string
}

const Input: FC<InputProps> = ({
                                   label,
                                   id,
                                   type,
                                   required,
                                   register,
                                   errors,
                                   disabled,
                                   placeholder,
                                   fullWidth
                               }) => {
    return (
        <div className="text-gray-900 dark:text-gray-100">
            {label &&
                <label
                    className="
                    block
                    text-sm
                    font-medium
                    leading-6
                "
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <div className={clsx(label && "mt-2", fullWidth && "w-full")}>
                <input
                    placeholder={placeholder}
                    type={type}
                    id={id}
                    required={required}
                    disabled={disabled}
                    autoComplete={id}
                    {...register(id, {required})}
                    className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        dark:ring-gray-700
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6
                        bg-white
                        dark:bg-gray-900`,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default")}
                />
            </div>
        </div>
    );
};

export default Input;