"use server";

import { HEADERS } from "@/constants";

export interface Relations {
    id: number;
    medicLastName: string;
    medicName: string;
    especiality: string;
    service: string;
}

export const getRelations = async (id: number) => {
    if (globalThis._relations) return globalThis._relations;
    const token = globalThis._token;
    if (!token) throw new Error("No token provided");

    const resp = await fetch(`https://api.hospitaldeclinicas.uba.ar/api/appointments/resources/relation/${id}`, {
        headers: { ...HEADERS, "x-token": globalThis._token },
    });

    const data = await resp.json();
    let relations = data.relations as Relations[];

    if (!relations) throw new Error("Vencio el token");

    relations = relations.filter((relation) => relation.medicName.includes("VESICULA"));

    globalThis._relations = relations;
    return relations;
};
