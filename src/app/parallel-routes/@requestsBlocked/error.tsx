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
        console.error(error)
    }, [error])

    return (
        <div className='text-white'>
            <h2>Desculpe, algo deu errado</h2>
            <button
                onClick={() => reset()
                }
            >
                Tentar Novamente
            </button>
        </div>
    )
}