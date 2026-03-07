import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

export const runtime = "edge";

// Não roda no node e sim no edge. O código passar a rodar em um ambiente mais enxuto sem acesso as apis do node como fs
// o default é nodejs
// edge é mais rapido
// na vercel, isso tem algum efeito
// na edge pode ser distribuido globalmente no edge da vercel
// podendo fica mais proximo do usuário
// fora da vercel sem uma aplicação real para o edge, pode não ter tantos efeitos reais, mas ter menos conexões com o node pode
// ser mais rapido.
// Abaixo algumas apis disponíveis no edge runtime


export default async function Page() {
  const startTime = Date.now();

  const geoData = {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: "pt-BR",
  };

  const requestId = crypto.randomUUID();

  const parsedUrl = new URL("https://example.com/api?foo=bar&baz=qux");

  const encoder = new TextEncoder();
  const encoded = encoder.encode("Hello Edge!");

  const processingTime = Date.now() - startTime;

  return (
    <div>
      <div>
        Edge Runtime

        <div>

          {JSON.stringify(geoData)}
        </div>


        <div>

          {requestId}
        </div>

        <div>

          {JSON.stringify(parsedUrl.toJSON())}
        </div>

        <div>

          {JSON.stringify(encoder)}
        </div>

        <div>

          {JSON.stringify(encoded)}
        </div>

        <div>

          {JSON.stringify(processingTime)}
        </div>
      </div>
    </div>
  );
}
