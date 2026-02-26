// veja rewrites in 'next.config.ts'

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const dashboards = {
    default: { name: "Dashboard Principal", color: "#6366f1", icon: "📊" },
    analytics: { name: "Analytics", color: "#06b6d4", icon: "📈" },
    finance: { name: "Financeiro", color: "#22c55e", icon: "💰" },
    ops: { name: "Operações", color: "#f59e0b", icon: "⚙️" },
  };

  const dashboard = dashboards[id as keyof typeof dashboards] || dashboards.default;

  return (
    <div >
      <h1>Rewrite Avançado</h1>

      <h2>
        {dashboard.name}
      </h2>
      <p>
        ID do dashboard: <code>{id}</code>
      </p>


      <div>
        <h3>
          Outros Dashboards
        </h3>
        <div>
          {Object.entries(dashboards).map(([dashId, dash]) => (
            <a
              key={dashId}
              href={`/rewrite-routes/dashboard/${dashId}`}

            >
              {dash.icon} {dash.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}