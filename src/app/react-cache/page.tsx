// Memoriza  resultados de funções assíncronas durante o mesmo request,
// evitando chamadas repetidas ao banco de dados
// é por request, ou seja, cada f5 o cache é resetado.
// Mas durante uma request o cache é usado
// Ideal para Server Components que precisam compartilhar dados sem reconsultar.
// Ao chamar multiplas vezes sem que a promise esteja resolvida, ele retorna a promise original, evitando chamadas repetidas ao banco de dados
//E também retorna o cache caso a promise esteja resolvida
import { cache } from "react";
import { auth } from "@/src/lib/auth";

let fetchCallCount = 0;
const getUserWithCache = cache(async () => {
  fetchCallCount++;
  const callNumber = fetchCallCount;

  console.log(`[cache()] getUser chamada - chamada #${callNumber}`);

  await new Promise((r) => setTimeout(r, 3000));

  const session = await auth();

  return {
    user: session?.user || null,
    fetchedAt: new Date().toISOString(),
    callNumber, // Número da chamada real ao DB
  };
});

let rawFetchCount = 0;
async function getUserWithoutCache() {
  rawFetchCount++;
  const callNumber = rawFetchCount;

  console.log(`[sem cache()] getUserRaw chamada - chamada #${callNumber}`);
  await new Promise((r) => setTimeout(r, 3000));
  const session = await auth();

  return {
    user: session?.user || null,
    fetchedAt: new Date().toISOString(),
    callNumber,
  };
}

async function UserCardWithCache() {
  const data = await getUserWithCache();

  return (
    <div className="bg-blue-500 text-white font-bold p-4 rounded-md shadow-2xl">
      <div>
        <span>Chamada #{data.callNumber}</span>
      </div>
      <div>
        Usuário: {data.user?.name || "Não autenticado"}
      </div>
    </div>
  );
}

async function UserCardWithouCache() {
  const data = await getUserWithoutCache();

  return (
    <div className="bg-blue-500 text-white font-bold p-4 rounded-md shadow-2xl">
      <div>
        <span>Chamada #{data.callNumber}</span>
      </div>
      <div>
        Usuário: {data.user?.name || "Não autenticado"}
      </div>
    </div>
  );
}

export default async function Case16Page() {

  return (
    <div>


      <h1 className="text-3xl text-white font-black">React Cache - Exemplo de uso</h1>

      <p className="text-white">Pressione F5.</p>

      <div>
        <h2 className="text-2xl text-white font-black">React Cache - Exemplo de uso</h2>
        <div className="grid grid-cols-3 mt-2 gap-4">
          {[...Array(20)].map((_, i) => (

            <UserCardWithCache key={i} />
          ))}

        </div>
      </div>

      <div>
        <h2 className="text-2xl text-white font-black">React Cache - Sem cache()</h2>
        <div className="grid grid-cols-3 mt-2 gap-4">
          {[...Array(20)].map((_, i) => (

            <UserCardWithouCache key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
