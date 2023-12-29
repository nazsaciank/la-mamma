"use server";
import { HEADERS } from "@/constants";

export async function auth() {
    try {
        const token = globalThis._token;
        if (!token) throw new Error("No token provided");

        const resp = await fetch("https://api.hospitaldeclinicas.uba.ar/api/login/renew", {
            headers: {
                ...HEADERS,
                "x-token": token,
            },
        });

        const data = await resp.json();

        if (data.ok) {
            globalThis._token = data.token;
            return true;
        } else {
            throw new Error("Error renewing token");
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
