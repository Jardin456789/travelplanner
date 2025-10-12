import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stepComments, insertStepCommentSchema } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

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

    const comments = await db
      .select()
      .from(stepComments)
      .where(eq(stepComments.stepId, stepId))
      .orderBy(desc(stepComments.createdAt));

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = insertStepCommentSchema
      .pick({
        stepId: true,
        author: true,
        content: true,
      })
      .parse(body);

    const [comment] = await db
      .insert(stepComments)
      .values({
        ...validatedInput,
        content: validatedInput.content.trim(),
      })
      .returning();

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
