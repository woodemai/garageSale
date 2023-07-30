import {ReactNode} from "react";
import Sidebar from "@/app/components/Sidebar";

export default function Layout({
    children,
    modal
                               }:{
    children:ReactNode,
    modal:ReactNode
}) {
    return(
        <div
            className="
                flex
                flex-row
                bg-gray-100
            "
        >
            <Sidebar/>
            {modal}
            {children}
        </div>
    )
}