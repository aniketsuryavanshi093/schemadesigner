import SchemaSidebar from "@/components/sidebar/SchemaSidebar";
import { Providers } from "@/providers/Providers";
import React, { ReactNode } from "react";
import "./schema.scss"

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Providers>
            <div className="flex w-full h-[100vh]">
                <SchemaSidebar />
                {children}
            </div>
        </Providers>
    );
};

export default layout;
