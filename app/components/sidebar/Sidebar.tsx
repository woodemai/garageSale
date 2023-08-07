'use client';
import SidebarElement from "@/app/components/sidebar/SidebarElement";
import {LuHome, LuWarehouse} from "react-icons/lu";
import {GiHomeGarage} from "react-icons/gi";
import SidebarNav from "@/app/components/sidebar/SidebarNav";
import {CgProfile} from "react-icons/cg";
import {BiCategory} from "react-icons/bi";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {CiSettings} from "react-icons/ci";

const Sidebar = () => {
    const pathname = usePathname()
    const [currentPathname, setCurrentPathname] = useState(pathname);
    useEffect(() => {
        setCurrentPathname(pathname)
     }, [pathname]);
    return (
        <div
            className="
                hidden
                py-2
                border-r
                h-screen
                border-gray-200
                dark:border-gray-700
                flex-col
                items-center
                sm:flex
                gap-2
                bg-white
                dark:bg-gray-900
                sticky
                top-0
                left-0
            "
        >
            <GiHomeGarage className="text-3xl text-gray-500 dark:text-gray-600 mb-4"/>
            <SidebarNav>
                <SidebarElement
                    selected={currentPathname.includes('/main')}
                    icon={LuHome} href='/main'
                />
                <SidebarElement
                    selected={currentPathname.includes('/storage')}
                    icon={LuWarehouse} href='/storage'
                />
                <SidebarElement
                    selected={currentPathname.includes('/categories')}
                    icon={BiCategory} href={'/categories'}
                />
            </SidebarNav>
            <SidebarNav>
                <SidebarElement
                    selected={currentPathname.includes('/profile')}
                    icon={CgProfile} href={'/profile'}
                />
                <SidebarElement
                    selected={currentPathname.includes('/settings')}
                    icon={CiSettings} href='/settings'
                />
            </SidebarNav>
        </div>
    );
};

export default Sidebar;