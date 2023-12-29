"use client";
import { useEffect, useRef } from "react";

export function useAudio(path: string) {
    const audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audio.current = new Audio(path);
    }, []);

    const play = (currentTime: number = 0) => {
        if (!audio.current) return;
        if (!audio.current.paused) return;
        audio.current.currentTime = currentTime;
        audio.current.play();
    };

    const pause = () => {
        if (!audio.current) return;
        audio.current.pause();
    };

    return { audio: audio.current, play, pause };
}
