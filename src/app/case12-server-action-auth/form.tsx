"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
    >
      {pending ? "Salvando..." : "Criar Nota"}
    </button>
  );
}

interface Case12FormProps {
  createNote: (formData: FormData) => Promise<void>;
}

export function Case12Form({ createNote }: Case12FormProps) {
  const [state, formAction] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      try {
        await createNote(formData);
        return null;
      } catch (e) {
        return (e as Error).message;
      }
    },
    null
  );

  return (
    <div >
      <h2 >
        Criar Nova Nota
      </h2>

      {state && (
        <div>
          ❌ {state}
        </div>
      )}

      <form action={formAction}>
        <input
          name="note"
          type="text"
          placeholder="Digite sua nota..."
          required
          minLength={3}
          maxLength={200}
        />

        <SubmitButton />
      </form>
    </div>
  );
}
