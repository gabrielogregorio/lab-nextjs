"use client"

import { useMemo } from "react"

export default function ClientList() {
    const items = useMemo(
        () => Array.from({ length: 5000 }, (_, i) => `Item ${i}`),
        []
    )

    return (
        <ul>
            {items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}