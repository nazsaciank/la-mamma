"use server";

export const getAppointment = async (id: number) => {
    const resp = await fetch(`https://api.hospitaldeclinicas.uba.ar/api/appointments/appointment/first/${id}`);

    const data = await resp.json();

    const appointment = data.appointment;

    return appointment;
};
