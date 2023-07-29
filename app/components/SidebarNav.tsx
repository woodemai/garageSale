import React, {FC, ReactNode} from 'react';
interface SidebarNav {
    children: ReactNode
}
const SidebarNav:FC<SidebarNav> = ({children}) => {
    return (
        <nav className="
                flex
                flex-col
                gap-1
                border-t
                mx  -4
                py-2
                border-t-gray-200

            "
        >
            {children}
        </nav>
    );
};

export default SidebarNav;