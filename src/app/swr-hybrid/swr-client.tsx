// recebe os dados iniciais do servidor via props pra evitar loading state, e depois usa o SWR para atualizar
// em tempo real

"use client";

import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface TimeData {
  time: string;
  isoString: string;
  timestamp: number;
}

interface SWRClientProps {
  initialData: TimeData;
}

// fallbackdata: Dado inicial do servidor, sem loading state

export function SWRClient({ initialData }: SWRClientProps) {
  const [updateCount, setUpdateCount] = useState(0);
  const [refreshInterval, setRefreshInterval] = useState(3000);

  const { data, isLoading, isValidating, mutate } = useSWR<TimeData>(
    "/api/time",
    fetcher,
    {
      fallbackData: initialData, // fallback data
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: () => setUpdateCount((c) => c + 1),
    }
  );

  const isStale = data?.timestamp === initialData.timestamp; // é obsoleto

  return (
    <div>
      <div

      >

          <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>Relógio em Tempo Real</h2>


            {isValidating && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  animation: "pulse 1s infinite",
                  display: "inline-block",
                }}
              />
            )}
            
            <span
              className={`badge ${isStale ? "badge-yellow" : "badge-green"}`}
            >
              {isStale ? "Dado inicial (SSR)" : "Atualizado (SWR)"}
            </span>


        <div

        >
          {data?.time || initialData.time}
        </div>

        <div>
          Timestamp: {data?.timestamp}
        </div>
      </div>


      <div >
        <h3 >
          Controles do SWR
        </h3>

        <div >
          <button

            onClick={() => mutate()}
          >
            Revalidar manualmente
          </button>

        </div>
      </div>

    </div>
  );
}
