// serer component

import { SWRClient } from "./swr-client";

async function getInitialData() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/time`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Page() {
  const initialData = await getInitialData(); // no loading, no state

  return (
    <div>

      <h1>SWR Híbrido</h1>

      <SWRClient initialData={initialData} />
    </div>
  );
}
