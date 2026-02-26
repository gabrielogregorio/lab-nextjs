// Cada provider cria um usuário novo
import NextAuth, { DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { randomUUID } from 'crypto';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      provider: string;
      providerAccountId: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    internalUserId?: string;
    provider?: string;
    providerAccountId?: string;
  }
}

// Example upsert
async function exampleUpsertUserWithAccount(params: {
  provider: string;
  providerAccountId: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) {
  const { provider, providerAccountId, name, email, image } = params;
  console.log('[AUTH_ACCOUNT_RECEIVED]', {
    provider,
    providerAccountId,
  });

  const internalUserId = randomUUID(); // create or use db with same provider and providerAccountId || this example is mock
  console.log('[AUTH_USER_CREATED]', {
    internalUserId,
    provider,
    providerAccountId,
  });

  // displayName // system field
  // displayEmail // system field
  // displayImage // system field

  // providerName // provider field
  // providerEmail// provider field
  // providerImage// provider field
  // const name = user.displayName ?? user.providerName;
  // a ui deve apresentar a um checkbox pra usar o provider name ou para customizar
  // Isso deve valer para cada campo. O padrão é usar do provider.
  // Em caso de dessincronização, deve se mostrar um alerta indicando que o dado do provider
  // é diferente do nome na aplicação.
  // O dado da aplicação é sempre o considerado.
  // OU => Não permitir alterações, ou só permitir alterar nome

  console.log('👤 [USER_PROFILE]', {
    name,
    email,
    image,
  });

  return {
    internalUserId,
  };
}

export const {
  handlers, // Handlers GET/POST
  auth, // function get sessiction in server components
  signIn, // action login
  signOut, // action logOut
} = NextAuth({
  providers: [
    GitHub({
      // vá em https://github.com/settings/developers -> new Qauth App
      // url => http://localhost:3000
      // http://localhost:3000/api/auth/callback/github
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // custom callback
  callbacks: {
    async jwt({ token, account, user }) {
      // run in first login
      if (!account || !account.providerAccountId) {
        throw new Error('Missing account or providerAccountId');
      }

      const provider = account.provider; // external id
      const providerAccountId = account.providerAccountId; // provider external id

      const { internalUserId } = await exampleUpsertUserWithAccount({
        provider,
        providerAccountId,
        name: user?.name,
        email: user?.email,
        image: user?.image,
      });

      token.internalUserId = internalUserId;
      token.provider = provider;
      token.providerAccountId = providerAccountId;

      return token;
    },

    // added user id to session for easier access in server components
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.internalUserId as string;
        session.user.provider = token.provider as string;
        session.user.providerAccountId = token.providerAccountId as string;
      }

      return session;
    },
  },

  pages: {
    signIn: '/login', // Redirect to login
    error: '/login', // auth error
  },
});
