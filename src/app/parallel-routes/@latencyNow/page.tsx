async function getAnalytics() {
  await new Promise((r) => setTimeout(r, 3000));

  return fetch('/bug-router')
}

export default async function AnalyticsSlot() {
  await getAnalytics();

  return (
    <div>
      Simula rota com error
    </div>
  );
}
