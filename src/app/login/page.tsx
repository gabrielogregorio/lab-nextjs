import { signIn } from "@/src/lib/auth";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";


interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const { callbackUrl, error } = await searchParams;

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (

    <div className="card w-full max-w-md text-center bg-color-card border border-color-border rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-2 text-color-fg">
        Acesso Restrito
      </h1>
      <p className="text-sm text-color-muted mb-6">
        Faça login com GitHub para acessar os challenges de Next.js
      </p>

      {error && (
        <div className="warning-box bg-orange-950 border border-orange-700 rounded-lg p-4 mb-4 text-sm text-color-warning">
          ⚠️ Erro na autenticação: {error}
        </div>
      )}

      <form
        action={async () => {
          "use server";
          await signIn("github", {
            redirectTo: callbackUrl || "/",
          });
        }}
      >
        <button
          type="submit"
          className="btn btn-primary w-full bg-color-accent hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-150"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continuar com GitHub
        </button>
      </form>

      {callbackUrl && (
        <p className="mt-4 text-xs text-color-muted">
          Você será redirecionado para:{" "}
          <code className="font-mono bg-color-muted px-1 py-0.5 rounded text-[0.875em]">{callbackUrl}</code>
        </p>
      )}
    </div>

  );
}
