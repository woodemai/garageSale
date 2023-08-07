'use client';
import {FC} from "react";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import clsx from "clsx";

interface SelectProps<T> {
    items: T[],
    id: string,
    optionTitle: (element: T) => string,
    optionValue: (element: T) => any
    title: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean,
    required?: boolean
    placeholder?: string
    defaultValue?:string
}

const Select: FC<SelectProps<any>> = ({
                                          items,
                                          id,
                                          optionTitle,
                                          optionValue,
                                          title,
                                          register,
                                          errors,
                                          disabled,
                                          required,
                                          placeholder
                                      }) => {
    return (
        <div>
            <label htmlFor={id}>{title}</label>
            <select
                id={id}
                disabled={disabled}
                autoComplete={id}
                defaultValue={""}
                {...register(id, {required: required})}
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
            >
                {placeholder && <option value={""} disabled>{placeholder}</option>}
                {items.map(item =>
                    <option value={optionValue(item)} key={item.id}>{optionTitle(item)}</option>)}
            </select>
        </div>
    );
};

export default Select;