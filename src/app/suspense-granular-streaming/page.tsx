// streaming + suspense granular

import { Suspense } from "react";
import { auth } from "@/src/lib/auth";


async function FastBlock() {
  await new Promise((r) => setTimeout(r, 200)); // speed component

  return (
    <div className="h-16 bg-green-600 rounded-md text-white flex items-center justify-center shadow-2xl">
      Componente Rápido
    </div>
  );
}

async function MediumBlock() {
  await new Promise((r) => setTimeout(r, 1500)); // speed component

  return (
    <div className="h-16 bg-orange-600 rounded-md text-white flex items-center justify-center shadow-2xl">
      Componente Medio
    </div>
  );
}


async function SlowBlock() {
  await new Promise((r) => setTimeout(r, 3000)); // speed component

  return (
    <div className="h-16 bg-red-600 rounded-md text-white flex items-center justify-center shadow-2xl">
      Componente Pesado
    </div>
  );
}


function BlockSkeleton({ label }: { label: string; }) {
  return (
    <div

      className={`h-16 rounded-md bg-gray-400 animate-pulse text-white flex items-center justify-center shadow-2xl`}
    >

      {label}
    </div>
  );
}

export default function Page() {
  return (
    <div >

      <h1>Streaming + Suspense Granular</h1>

      <div
        className="flex justify-center items-center "
      >
        <div className="max-w-123">


          <Suspense fallback={<BlockSkeleton label="Rápido" />}>
            <FastBlock />
          </Suspense>

          <Suspense fallback={<BlockSkeleton label="Médio" />}>
            <MediumBlock />
          </Suspense>

          <Suspense fallback={<BlockSkeleton label="Lento" />}>
            <SlowBlock />
          </Suspense>
        </div>
      </div>

    </div>
  );
}

// TTFB é mínimo — o usuário vê conteúdo imediatamente