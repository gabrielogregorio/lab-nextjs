import { cookies, headers } from "next/headers";

export default async function Page() {
  // O Next.js detecta o uso dessas funções dinamicas por usuário e não pode cachear esta página com ssg
  // searchParams
  // useSearchParams()

  const cookieStore = await cookies();
  const abGroup = cookieStore.get("ab-group");
  const allCookies = cookieStore.getAll();

  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent");
  const acceptLanguage = headerStore.get("accept-language");

  const renderTime = new Date().toLocaleTimeString("pt-BR");

  return (
    <div>
      <div>
        Ao ler cookies, que são dinamicos e por usuáario, o nextjs já força a página a ser dinamica e impede que ela seja SSG
      </div>

      <div>
        {renderTime}
      </div>

      <div>

        {acceptLanguage}
      </div>

      <div>

        {userAgent}
      </div>

      <div>

        {abGroup?.name}
      </div>

      <div>


        <div>
          <h1>Cookies</h1>
          <div>
            {allCookies.map((cookie) => (
              <div
                key={cookie.name}
              >
                <span>
                  {cookie.name}
                </span>
                <span>
                  {cookie.value}
                </span>
              </div>
            ))}
          </div>
        </div>


        <div>
          <h2>Para diminuir impacto</h2>
          <ul>
            <li>Isolar componente com cookies em componentes especificos, nunca em layout</li>
            <li>Usar PPR para renderização</li>
            <li>Não usar cookies em layouts, isso torna a arore dinamica</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
