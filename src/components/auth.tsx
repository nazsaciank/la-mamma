"use client";
import { auth } from "@/actions/auth";
import React, { useEffect } from "react";

interface AuthProps {
    children: React.ReactNode;
}

export function Auth({ children }: AuthProps) {
    useEffect(() => {
        setInterval(async () => {
            await auth();
        }, 1.2e6);
    }, []);

    return <>{children}</>;
}
