'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // console.error(error)
    }, [error])

    return (
        <div className='text-white font-mono bg-red-100/10 h-full flex items-center justify-center flex-col'>
            <h2 className='text-base'>Desculpe, algo deu errado</h2>
            <button
                className='text-red-400 text-sm font-black px-3 py-2 rounded-sm'
                onClick={() => reset()
                }
            >
                Tentar Novamente
            </button>
        </div>
    )
}