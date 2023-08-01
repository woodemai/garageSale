'use client';
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import MobileItem from "@/app/components/sidebar/MobileItem";
import {LuHome, LuWarehouse} from "react-icons/lu";
import {BiCategory} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";

const MobileFooter = () => {
    const pathname = usePathname()
    const [currentPathname, setCurrentPathname] = useState(pathname);
    useEffect(() => {
        setCurrentPathname(pathname)
    }, [currentPathname, pathname]);
    return (
        <div
            className="
                sm:hidden
                fixed
                bottom-0
                w-full
                bg-white
                flex
                flex-row
                justify-between
                px-12
                z-40
            "
        >
            <MobileItem item={LuHome} href={'/main'} selected={currentPathname.includes('/main')}/>
            <MobileItem item={LuWarehouse} href={'/storage'} selected={currentPathname.includes('/storage')}/>
            <MobileItem item={BiCategory} href={'/categories'} selected={currentPathname.includes('/categories')}/>
            <MobileItem item={CgProfile} href={'/profile'} selected={currentPathname.includes('/profile')}/>
        </div>
    )
}
export default MobileFooter;