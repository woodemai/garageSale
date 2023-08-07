import React, {FC, ReactNode} from 'react';

interface SidebarNavProps {
    children: ReactNode
}

const SidebarNav: FC<SidebarNavProps> = ({children}) => {
    return (
        <nav className="
                flex
                flex-col
                gap-1
                border-t
                mx  -4
                py-2
                border-t-gray-200
                dark:border-t-gray-700
            "
        >
            {children}
        </nav>
    );
};

export default SidebarNav;