import {ReactNode} from "react";
import Sidebar from "@/app/components/Sidebar";

export default function Layout({
    children
                               }:{children:ReactNode}) {
    return(
        <div
            className="
                flex
                flex-row
            "
        >
            <Sidebar/>
            {children}
        </div>
    )
}