import ToggleThemeButton from "@/app/[locale]/(main)/settings/components/ToggleThemeButton";
import UserChange from "@/app/[locale]/(main)/settings/components/UserChange";

const Settings = () => {
    return (
        <div className="
                flex
                flex-col
                justify-center
                items-center
                gap-y-4
                w-full
                pt-4
                bg-white
                dark:bg-gray-900
                sm:bg-gray-100
                dark:sm:bg-gray-950
                pb-16
            "
        >
            <ToggleThemeButton/>
            <UserChange/>
        </div>
    );
};

export default Settings;