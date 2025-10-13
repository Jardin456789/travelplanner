import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stepComments } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { z } from 'zod';

const commentInputSchema = z.object({
  stepId: z.coerce.number().int(),
  parentId: z.coerce.number().int().nullable().optional(),
  author: z.string().optional(),
  content: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stepIdParam = searchParams.get('stepId');

    if (!stepIdParam) {
      return NextResponse.json({ error: 'stepId est requis' }, { status: 400 });
    }

    const stepId = Number(stepIdParam);
    if (Number.isNaN(stepId)) {
      return NextResponse.json({ error: 'stepId invalide' }, { status: 400 });
    }

    const rawComments = await db
      .select()
      .from(stepComments)
      .where(eq(stepComments.stepId, stepId))
      .orderBy(asc(stepComments.createdAt));

    type CommentNode = (typeof rawComments)[number] & { replies: CommentNode[] };

    const commentMap = new Map<number, CommentNode>();
    const rootComments: CommentNode[] = [];

    for (const comment of rawComments) {
      commentMap.set(comment.id, { ...comment, replies: [] });
    }

    for (const comment of rawComments) {
      const node = commentMap.get(comment.id);
      if (!node) continue;

      if (comment.parentId) {
        const parentNode = commentMap.get(comment.parentId);
        if (parentNode) {
          parentNode.replies.push(node);
        } else {
          rootComments.push(node);
        }
      } else {
        rootComments.push(node);
      }
    }

    return NextResponse.json(rootComments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = commentInputSchema.parse(body);

    const trimmedContent = validatedInput.content.trim();

    if (!trimmedContent) {
      return NextResponse.json({ error: 'Le contenu du commentaire est requis' }, { status: 400 });
    }

    const sanitizedInput = {
      stepId: validatedInput.stepId,
      parentId: validatedInput.parentId ?? null,
      author: (validatedInput.author ?? '').trim() || 'Invité',
      content: trimmedContent,
    };

    if (sanitizedInput.parentId) {
      const [parentComment] = await db
        .select()
        .from(stepComments)
        .where(eq(stepComments.id, sanitizedInput.parentId));

      if (!parentComment) {
        return NextResponse.json({ error: 'Commentaire parent introuvable' }, { status: 400 });
      }

      if (parentComment.stepId !== sanitizedInput.stepId) {
        return NextResponse.json(
          { error: 'Le commentaire parent appartient à une autre étape' },
          { status: 400 },
        );
      }
    }

    const inserted = await db
      .insert(stepComments)
      .values({
        ...sanitizedInput,
      })
      .returning();

    const comment = Array.isArray(inserted) ? inserted[0] : inserted.rows?.[0];

    if (!comment) {
      return NextResponse.json({ error: 'Le commentaire n’a pas pu être créé' }, { status: 500 });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
