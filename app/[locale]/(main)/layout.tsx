import {ReactNode} from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import MobileFooter from "@/app/components/sidebar/MobileFooter";

export default function Layout({
                                   children,
                               }: {
    children: ReactNode,
}) {
    return (
        <div
            className="
                flex
                flex-row
            "
        >
            <Sidebar/>
            <MobileFooter/>
            {children}
        </div>
    )
}