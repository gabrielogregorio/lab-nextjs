// [...nextauth] é um catch all pra pegar todas as rotas em /auth/qualquerCoisa

import { handlers } from '@/src/lib/auth';

// Exporta os handlers GET e POST do NextAuth
// Next.js App Router usa named exports para métodos HTTP
export const { GET, POST } = handlers;
