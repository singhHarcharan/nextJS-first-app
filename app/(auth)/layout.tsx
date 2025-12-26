import React from "react";

export default function Authlayout({ children }: {
    children: React.ReactNode;
}) {
    return <div>
        <div className="flex justify-center">
            20% off for next few days.
        </div>
        {children}
    </div>
}