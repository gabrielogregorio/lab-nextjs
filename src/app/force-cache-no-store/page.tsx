import { revalidateTag } from "next/cache";

async function fetchWithCache() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/time`, {
    cache: "force-cache", // sempre usar cache
    next: { revalidate: 30 }, // 30 seconds
  });
  const data = await res.json();
  return { ...data, strategy: "force-cache + revalidate: 30s <- com cache com tempo" };
}

async function fetchNoStore() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/time`, {
    cache: "no-store", // não usar cache
  });
  const data = await res.json();
  return { ...data, strategy: "no-store <- sem cache" };
}

const tagRequest = 'time-data';

async function fetchWithTag() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/time`, {
    next: {
      revalidate: 60,
      tags: [tagRequest], // revalidate tag
    },
  });
  const data = await res.json();
  return { ...data, strategy: "revalidate tag OU 60 segundos" };
}

interface TimeData {
  time: string;
  timestamp: number;
  strategy: string;
}

function TimeCard({ data, color }: { data: TimeData; color: string }) {
  return (
    <div className="card" style={{ borderColor: color + "33" }}>
      <div
        className="text-sm font-black uppercase"
        style={{
          color: color,
        }}
      >
        {data.strategy}
      </div>
      <div

        className="text-2xl font-mono font-black text-white"
      >
        {data.time}
      </div>
      <div >
        Unix timestamp: {data.timestamp}
      </div>
    </div>
  );
}

export default async function Case17Page() {
  const [cached, fresh, tagged] = await Promise.all([
    fetchWithCache(),
    fetchNoStore(),
    fetchWithTag(),
  ]);

  const pageRenderedAt = new Date().toLocaleTimeString("pt-BR");

  return (
    <div>
      <h1>no-store vs force-cache vs tags</h1>

      <div
        className="px-3 py-4 bg-card border rounded-xl text-sm font-mono"
      >
        Página renderizada às: <strong>{pageRenderedAt}</strong>
      </div>

      <div
        className="grid grid-cols-2 gap-4"
      >
        <TimeCard data={cached} color="#22c55e" />
        <TimeCard data={fresh} color="#ef4444" />
        <TimeCard data={tagged} color="#f59e0b" />
      </div>


      <form action={async () => {
        "use server"
        revalidateTag(tagRequest, 'max')
      }}>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Revalidate Tag
        </button>
      </form>
    </div>
  );
}
