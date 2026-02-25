'use client'


import { useActionState } from 'react'
import type { ActionState } from './actions'
import { SubmitButton } from './submitButton'

const initialState: ActionState = { success: true }

export function CreatePostForm({
    action,
}: {
    action: (prev: ActionState, formData: FormData) => Promise<ActionState>
}) {
    const [state, formAction] = useActionState(action, initialState)

    return (
        <form action={formAction} className="mt-6 flex flex-col gap-2">
            <input
                name="title"
                placeholder="Digite o título"
                className="border px-2 py-1"
            />

            <SubmitButton />

            {state.success === false && (
                <p className="text-red-500">{state.error}</p>
            )}

            {state.success === true && (
                <p className="text-green-600">Post criado com sucesso</p>
            )}
        </form>
    )
}