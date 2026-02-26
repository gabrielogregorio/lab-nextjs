import { auth, signOut } from "../../lib/auth";
import { revalidatePath } from "next/cache";
import { Case12Form } from "./form";

// db in memmory
const notes: { id: number; text: string; author: string; createdAt: Date }[] = [];
let noteId = 1;


// server action called by client, but protected by session
// this server action validates session internally, so even if the form is bypassed (ex: Postman), the action will reject the mutation if there's no valid session
export async function createNote(formData: FormData) {
  "use server";

  // verify github session
  const session = await auth();

  if (!session || !session.user) {
    // Throw error and previne Security Misconfiguration
    throw new Error("Não autorizado: você precisa estar logado para criar notas");
  }

  // validation data, prevent sql injection, ... (exemple only...)
  const text = formData.get("note")?.toString().trim();

  if (!text || text.length < 3) {
    throw new Error("note need has greter 3 characters");
  }

  if (text.length > 200) {
    throw new Error("note is very large, max 200 characters");
  }

  notes.push({
    id: noteId += 1,
    text,
    author: session.user.name || session.user.email || "Usuário Desconecido",
    createdAt: new Date(),
  });

  // Revalidate page
  revalidatePath("/case12-server-action-auth");
}

export default async function Case12Page() {
  const session = await auth();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-700">
      {session ? (
        <div>

          <div className="bg-green-950 border border-green-700 rounded-lg p-4 mb-6 text-sm text-green-400">
            ✅ Autenticado como <strong>{session.user?.name}</strong>
            {JSON.stringify(session.user)}
          </div>


          <form action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" });
          }}>

            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer font-semibold text-sm hover:scale-105 transition-transform duration-150">Sair</button>
          </form>
        </div>
      ) : (
        <div>

          <div className="bg-amber-950 border border-amber-700 rounded-lg p-4 mb-6 text-sm text-amber-400">
            ⚠️ Não autenticado
          </div>
          <a href="/login" rel="canonical" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm mb-8">
            Fazer Login
          </a>

        </div>
      )}



      <Case12Form createNote={createNote} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Notas criadas ({notes.length})
        </h2>

        {notes.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center text-slate-400">
            Nenhuma nota ainda. Crie uma acima!
          </div>
        ) : (
          notes
            .slice()
            .reverse()
            .map((note) => (
              <div key={note.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-4">
                <p className="mb-3 text-slate-100">{note.text}</p>
                <div className="flex gap-4 text-xs text-slate-400">
                  <span>👤 {note.author}</span>
                  <span>🕐 {note.createdAt.toLocaleTimeString("pt-BR")}</span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
