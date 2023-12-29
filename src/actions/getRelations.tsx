"use server";

const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8,ru;q=0.7",
    connection: "keep-alive",
    "if-none-match": 'W/"421-I0m0jaKjGdVcgwBHr3g7p9ldCbw"',
    origin: "https://portal.hospitaldeclinicas.uba.ar",
    referer: "https://portal.hospitaldeclinicas.uba.ar/",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    //idUser: "633ac29db976764e679d893f",
    "sec-ch-ua": 'Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    "x-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzNhYzI5ZGI5NzY3NjRlNjc5ZDg5M2YiLCJpYXQiOjE3MDM4NjM3MDcsImV4cCI6MTcwMzg2NTUwN30.S20bSh_1yHeAnSYhq9MatuTn6SVruKuumNTEguAoQl8",
};

export interface Relations {
    id: number;
    medicLastName: string;
    medicName: string;
    especiality: string;
    service: string;
}

export const getRelations = async (id: number) => {
    const resp = await fetch(`https://api.hospitaldeclinicas.uba.ar/api/appointments/resources/relation/${id}`, {
        headers,
    });

    const data = await resp.json();
    let relations = data.relations as Relations[];

    if (!relations) throw new Error("Vencio el token");

    relations = relations.filter((relation) => relation.medicName.includes("VESICULA"));

    return relations;
};
