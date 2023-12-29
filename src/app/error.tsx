"use client";
import React from "react";

interface ErrorProps {}

export default function Error({}: ErrorProps) {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <h1 className='text-5xl mb-4'>Falta el token</h1>
            <p>Cada cierto tiempo el sistema necesita de un token de la página, pídanselo a naza.</p>
        </div>
    );
}
