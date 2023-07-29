import React from 'react';
import SidebarElement from "@/app/components/SidebarElement";
import {LuHome, LuWarehouse} from "react-icons/lu";
import {GiHomeGarage} from "react-icons/gi";
import SidebarNav from "@/app/components/SidebarNav";
import {AiFillSetting} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";

const Sidebar = () => {
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
            "
        >
            <SidebarElement xl disabled icon={GiHomeGarage} href='/main'/>
            <SidebarNav>
                <SidebarElement icon={LuHome} href='/main'/>
                <SidebarElement icon={LuWarehouse} href='/storage'/>
            </SidebarNav>
            <SidebarNav>
                <SidebarElement icon={CgProfile} href={'/profile'}/>
                <SidebarElement icon={AiFillSetting} href='/settings'/>
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