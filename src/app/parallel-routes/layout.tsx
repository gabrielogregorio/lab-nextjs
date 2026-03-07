export default function Layout({
  children,
  latencyNow,
  requestsNow,
  unmappedRequests,
  requestsBlocked
}: {
  children: React.ReactNode;
  latencyNow: React.ReactNode;
  requestsNow: React.ReactNode;
  unmappedRequests: React.ReactNode;
  requestsBlocked: React.ReactNode
}) {
  return (
    <section aria-labelledby="title-metrics">
      <>
        {children}

        <div className="grid grid-cols-2 gap-2 px-8 mt-4">
          {latencyNow}
          {requestsNow}
          {unmappedRequests}
          {requestsBlocked}
        </div>
      </>
    </section>
  );
}
