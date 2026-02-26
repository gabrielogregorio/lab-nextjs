import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/src/lib/auth';
import { AB_COOKIE_MAX_AGE_IN_SECONDS, AB_COOKIE_NAME } from './app/utils';

// CONFIG

// rotas protegidas
// o next só aplicará o middleware
export const config = {
  matcher: ['/protected-route/:path*', '/admin/:path*', '/example-ab-test/:path*'],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[MIDDLEWARE]', pathname);

  // example application ab test layout
  if (pathname.startsWith('/example-ab-test')) {
    const response = NextResponse.next();

    // verify if user has ab-group cookie
    let abGroup = request.cookies.get(AB_COOKIE_NAME)?.value;

    if (!abGroup) {
      abGroup = Math.random() < 0.5 ? 'A' : 'B';

      response.cookies.set(AB_COOKIE_NAME, abGroup, {
        maxAge: AB_COOKIE_MAX_AGE_IN_SECONDS,
        httpOnly: false, // Precisa ser lido no client - se fosse só layout não precisaria

        // Proteção contra CSRF (Cross-Site Request Forgery ou Falsificação de Solicitação Entre Sites) é
        // outro site faz uma request form data com, exemplo:
        // Site crimininoso
        // <form action="https://meuSite.com/transfer" method="POST">
        // Com o **sameSite: 'none',**
        // o navegador enviaria o cookie do meuSite junto ao conteudo do form do site atacante
        // e poderia por exemplo tranferir dinheiro meu pra outra conta

        // Se for **sameSite: 'strict',** ele só permitiria do meu site para o meu site

        // se for **sameSite: 'lax',**
        // - só permite isso em sites que você clicou
        // - digitou url
        // -houve redirect
        // - mudança de página principal
        sameSite: 'lax',
      });
    }

    response.headers.set(AB_COOKIE_NAME, abGroup);
    return response;
  }

  const session = await auth();

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname); // pra retornar ao caminho original após login

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
