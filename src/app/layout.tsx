import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "La Mamma",
    description: "Atentos a los turnos para la mamma",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className='dark'>
            <body className={`${inter.className}`}>
                <main className='bg-background text-foreground'>
                    <Provider>{children}</Provider>
                </main>
            </body>
        </html>
    );
}
