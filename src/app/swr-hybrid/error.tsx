"use client";

import { NextErrorProps } from "@/next.error";

export default function Error({ error, reset }: NextErrorProps) {
    return (
        <div>
            <h2>Algo deu errado</h2>
            <button onClick={() => reset()}>Tentar novamente</button>
        </div>
    );
}