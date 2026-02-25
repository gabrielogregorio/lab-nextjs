import { Suspense } from "react";

export async function ParteRapida() {
    return <div>
        <h2 className="text-4xl text-white">Parte Rapida</h2>
    </div>
}



export async function HeavySection() {
    await new Promise(r => setTimeout(r, 10000))

    return <div>
        <h3 className="text-2xl text-white">Parte Pesada</h3>
    </div>
}


export default async function Page() {

    return <main className="mt-24">
        <ParteRapida />

        <Suspense fallback={<div className="text-2xl text-white">Carregando parte pesada...</div>}>
            <HeavySection />
        </Suspense >
    </main >
}