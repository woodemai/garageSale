'use client';
import SidebarElement from "@/app/components/sidebar/SidebarElement";
import {LuHome, LuWarehouse} from "react-icons/lu";
import {GiHomeGarage} from "react-icons/gi";
import SidebarNav from "@/app/components/sidebar/SidebarNav";
import {AiFillSetting} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";
import {BiCategory} from "react-icons/bi";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname()
    const [currentPathname, setCurrentPathname] = useState(pathname);
    useEffect(() => {
        setCurrentPathname(pathname)
     }, [pathname]);
    return (
        <div
            className="
                py-2
                border-r
                h-screen
                border-gray-200
                flex-col
                items-center
                flex
                gap-2
                bg-white
                sticky
                top-0
                left-0
            "
        >
            <SidebarElement
                disabled icon={GiHomeGarage} href='/main'
                xl
            />
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
                    icon={AiFillSetting} href='/settings'
                />
            </SidebarNav>
            <nav
                className="
                    flex
                    flex-col
                    justify-start
                    items-end
                    gap-2
                    m-2
                "
            >

            </nav>
        </div>
    );
};

export default Sidebar;