async function getRequestsNow() {
  await new Promise((r) => setTimeout(r, 5000));

  return {
    requestsShort: '4.3B',
    requests: '4.328.271.163'
  };
}

export default async function Page() {
  const requestsNow = await getRequestsNow();

  return (
    <article aria-labelledby="requests-realizadas-titulo" className="bg-linear-60 from-blue-400 to-blue-500 p-2 rounded-md shadow-2xl text-white/90">
      <h3 id="requests-realizadas-titulo" className="text-center">Recebidas</h3>
      <p className="text-center text-2xl"><strong>{requestsNow.requestsShort}</strong></p>
      <p className="text-center text-xs">{requestsNow.requests}</p>
    </article>
  );
}
