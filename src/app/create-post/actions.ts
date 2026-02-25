'use server';

import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const TAG_NAME = 'posts-list';

const createPostSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
});

export type ActionState = { success: true } | { success: false; error: string };

export async function createPost(_: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    title: formData.get('title'),
  };

  const result = createPostSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors.title?.[0] ?? 'Erro de validação',
    };
  }

  await new Promise((r) => setTimeout(r, 800)); // agurdadndo processamento

  revalidateTag(TAG_NAME, 'max'); // simulando pra adicionar novo post

  return { success: true };
}
