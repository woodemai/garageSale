import ToggleThemeButton from "@/app/[locale]/(main)/settings/components/ToggleThemeButton";

const Settings = () => {
    return (
        <div className="
                flex
                justify-center
                items-center
                w-full
                pt-4
                bg-white
                dark:bg-gray-900
                sm:bg-gray-100
                dark:sm:bg-gray-950
            "
        >
            <ToggleThemeButton/>
        </div>
    );
};

export default Settings;