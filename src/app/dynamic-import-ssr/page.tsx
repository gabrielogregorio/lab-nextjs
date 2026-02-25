'use client' // pré renderiza no servidor, mas não executa actions e effects

import dynamic from "next/dynamic";

const DynamicClientSideComponent = dynamic(() => import("./ClientSideComponent").then(module => module.ClientSideComponent), {
    ssr: false, // Não pré renderiza no servidor
    loading: () => <div className="text-white">Loading...</div>
}
)

export default function SuspenseFallback() {
    return (
        <div className="mt-24 text-center">
            <h1 className="text-white">Suspense Fallback</h1>
            <p className="text-white">This is the fallback component that will be rendered while the dynamic component is loading.</p>
            <DynamicClientSideComponent />
        </div>
    )
}