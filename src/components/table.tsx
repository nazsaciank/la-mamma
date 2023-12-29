"use client";
import { getAppointment } from "@/actions/getAppointment";
import { Relations } from "@/actions/getRelations";
import { useLoading } from "@/hooks/use-loading";
import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useMemo, useRef, useState } from "react";

interface TableProps {
    relations: Relations[];
}

interface Medic {
    id: number;
    name: string;
    status: "Disponible" | "No Disponible";
    date: string;
}

export function TableMedics({ relations }: TableProps) {
    const [medics, setMedics] = useState<Medic[]>([]);
    const { loading, stopLoading } = useLoading(true);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const isMedicAvailable = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        getMedics();
        interval.current = setInterval(() => getMedics(), 5000);
    }, [relations]);

    const getMedics = async () => {
        let medics: Medic[] = [];
        for await (const relation of relations) {
            let medic: Medic = {
                id: relation.id,
                name: `${relation.medicLastName}, ${relation.medicName}`,
                status: "No Disponible",
                date: new Date().toLocaleString(),
            };

            const appointment = await getAppointment(relation.id);

            let isTurnAvailable = false;
            if (Array.isArray(appointment)) {
                for await (const app of appointment) {
                    medic.status = "Disponible";
                    isTurnAvailable = true;
                    break;
                }
            } else {
                medic.status = "Disponible";
                isTurnAvailable = true;
            }
            medics.push(medic);

            if (isTurnAvailable && interval.current) clearInterval(interval.current);
            if (isTurnAvailable && !isMedicAvailable.current) {
                isMedicAvailable.current = true;
                const audio = audioRef.current;
                if (!audio) return;
                audio.currentTime = 4.7;
                audio.play();
            }
        }
        setMedics(medics);
        if (loading) stopLoading();
    };

    return (
        <div className='w-full max-w-[900px] h-screen flex flex-col justify-center items-center mx-auto'>
            <div className='mb-4 text-center'>
                <h1 className='text-4xl'>Disponibilidad de los Turnos</h1>
                <p>Cuando haya Disponibilidad en algun turno se ejecutara un sonido para ir rapido a sacar el turno.</p>
            </div>

            <audio ref={audioRef} id='audio' hidden muted={muted} src='song.mp3' />

            <Button
                className='mb-4'
                onClick={() => {
                    if (!audioRef.current) return;
                    const audio = audioRef.current;
                    audio.muted = !audio.muted;
                    setMuted(audio.muted);
                }}
            >
                {!muted ? "Desactivar Sonido" : "Activar Sonido"}
            </Button>

            <Table aria-labelledby='Table de turnos medicos'>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Fecha</TableColumn>
                </TableHeader>
                <TableBody items={medics} isLoading={loading}>
                    {(medic) => (
                        <TableRow key={medic.id}>
                            <TableCell>{medic.id}</TableCell>
                            <TableCell>{medic.name}</TableCell>
                            <TableCell>
                                <Chip
                                    color={medic.status === "Disponible" ? "success" : "danger"}
                                    size='sm'
                                    variant='flat'
                                >
                                    {medic.status}
                                </Chip>
                            </TableCell>
                            <TableCell>{medic.date}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
