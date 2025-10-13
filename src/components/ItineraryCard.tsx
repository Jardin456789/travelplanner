'use client';

import {
  useState,
  useCallback,
  useMemo,
  type SyntheticEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type FormEvent,
  type ReactElement,
} from 'react';
import { DayItinerary, TransportType, StepCommentThread } from '@/types/travel';
import {
  ChevronDown,
  Calendar,
  Plane,
  Bus,
  Bike,
  Train,
  Car,
  Ship,
  Footprints,
  Home,
  Clock,
  StickyNote,
  Pencil,
  MessageSquare,
  Reply,
  ArrowUpRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { useStepComments, useCreateComment } from '@/hooks/useTravelQueries';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const transportDetails: Record<TransportType, { label: string; Icon: LucideIcon }> = {
  plane: { label: 'Avion', Icon: Plane },
  bus: { label: 'Bus', Icon: Bus },
  train: { label: 'Train', Icon: Train },
  car: { label: 'Voiture', Icon: Car },
  bike: { label: 'Vélo', Icon: Bike },
  boat: { label: 'Bateau', Icon: Ship },
  walk: { label: 'Marche', Icon: Footprints },
  rest: { label: 'Repos', Icon: Home },
};

interface ItineraryCardProps {
  dayItinerary: DayItinerary;
  itineraryId: number;
  isSelected?: boolean;
  isPast?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  isDragging?: boolean;
  disableDrag?: boolean;
}

export default function ItineraryCard({
  dayItinerary,
  isSelected = false,
  isPast = false,
  onSelect,
  onEdit,
  isDragging = false,
  disableDrag = false,
}: ItineraryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = formatDate(dayItinerary.date);
  const transportType = dayItinerary.transportToNext?.type as TransportType | undefined;
  const transportDetail = transportType ? transportDetails[transportType] : undefined;
  const TransportIconComponent = transportDetail?.Icon ?? Car;
  const transportLabel =
    transportDetail?.label ??
    (transportType ? transportType.charAt(0).toUpperCase() + transportType.slice(1) : '');
  const transportDuration = dayItinerary.transportToNext?.duration;
  const stepId = dayItinerary.id;
  const { data: comments = [], isLoading: areCommentsLoading } = useStepComments(stepId);
  const createCommentMutation = useCreateComment();
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const isSubmittingComment = createCommentMutation.isPending;
  const commentCount = useMemo(() => {
    const countNodes = (nodes: StepCommentThread[]): number =>
      nodes.reduce((total, node) => total + 1 + countNodes(node.replies ?? []), 0);
    return countNodes(comments);
  }, [comments]);
  const commentBadgeClass =
    commentCount > 0
      ? 'inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50/90 px-2.5 py-1 text-[11px] font-medium text-sky-700'
      : 'inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500';

  const toggleExpanded = useCallback(() => {
    setIsExpanded((previous) => !previous);
    onSelect?.();
  }, [onSelect]);

  const handleEdit = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      onEdit?.();
    },
    [onEdit],
  );

  const handleEditKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLSpanElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (onEdit) {
          void handleEdit(event);
        }
      }
    },
    [handleEdit, onEdit],
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleExpanded();
      }
    },
    [toggleExpanded],
  );

  const handleCommentSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!stepId || !commentContent.trim()) {
        return;
      }

      try {
        const authorValue = commentAuthor.trim();
        const payload: {
          stepId: number;
          content: string;
          author?: string;
        } = {
          stepId,
          content: commentContent.trim(),
        };

        if (authorValue) {
          payload.author = authorValue;
        }

        await createCommentMutation.mutateAsync(payload);
        setCommentContent('');
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
      }
    },
    [stepId, commentAuthor, commentContent, createCommentMutation],
  );

  const handleReplyToggle = useCallback(
    (commentId: number) => {
      setActiveReplyId((current) => (current === commentId ? null : commentId));
      setReplyContent('');
      if (!replyAuthor && commentAuthor.trim()) {
        setReplyAuthor(commentAuthor.trim());
      }
    },
    [commentAuthor, replyAuthor],
  );

  const handleReplySubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!stepId || activeReplyId === null || !replyAuthor.trim() || !replyContent.trim()) {
        return;
      }

      try {
        await createCommentMutation.mutateAsync({
          stepId,
          parentId: activeReplyId,
          author: replyAuthor.trim(),
          content: replyContent.trim(),
        });
        setReplyContent('');
        setActiveReplyId(null);
      } catch (error) {
        console.error('Erreur lors de la réponse au commentaire:', error);
      }
    },
    [activeReplyId, createCommentMutation, replyAuthor, replyContent, stepId],
  );

  function renderComment(comment: StepCommentThread, depth = 0): ReactElement {
    const displayName = comment.author?.trim() || 'Invité';
    const initial = displayName.charAt(0).toUpperCase();
    const isReplyFormVisible = activeReplyId === comment.id;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const cardClasses =
      depth === 0
        ? 'space-y-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-sky-100/70'
        : 'ml-6 space-y-3 rounded-xl border border-slate-100/70 bg-white/95 p-3 shadow-sm';

    return (
      <div key={comment.id} className={cardClasses}>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-[10px] font-semibold uppercase text-sky-700 shadow-sm">
            {initial}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span className="text-sm font-semibold text-slate-800">{displayName}</span>
              <span className="flex items-center gap-1">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {comment.content}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-7 w-7 rounded-full text-slate-400 hover:text-sky-600"
                onClick={() => handleReplyToggle(comment.id)}
                aria-label={
                  activeReplyId === comment.id ? 'Annuler la réponse' : 'Répondre à ce commentaire'
                }
              >
                <Reply className="h-3.5 w-3.5" aria-hidden />
              </Button>
              {activeReplyId === comment.id && (
                <span className="text-[11px] font-medium text-sky-600">Réponse en cours</span>
              )}
            </div>
          </div>
        </div>

        {isReplyFormVisible && (
          <form
            onSubmit={handleReplySubmit}
            className="space-y-3 rounded-xl border border-sky-100/60 bg-sky-50/40 p-3"
          >
            <input
              type="text"
              value={replyAuthor}
              onChange={(event) => setReplyAuthor(event.target.value)}
              placeholder="Votre nom"
              className="w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              required
            />
            <textarea
              value={replyContent}
              onChange={(event) => setReplyContent(event.target.value)}
              placeholder="Répondez à ce commentaire…"
              rows={2}
              className="min-h-[70px] w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              required
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-600"
                onClick={() => setActiveReplyId(null)}
                aria-label="Annuler la réponse"
              >
                <ChevronDown className="h-3 w-3 rotate-90" aria-hidden />
              </Button>
              <Button
                type="submit"
                size="icon-sm"
                className="h-8 w-8 rounded-full bg-sky-600 text-white shadow-sm transition hover:bg-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1 disabled:opacity-60"
                disabled={isSubmittingComment || !replyAuthor.trim() || !replyContent.trim()}
                aria-label="Envoyer la réponse"
              >
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Button>
            </div>
          </form>
        )}

        {hasReplies && (
          <div className="space-y-2 border-l border-dashed border-sky-100 pl-4">
            {comment.replies.map((child) => renderComment(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }

  const destinationName = dayItinerary.destination?.name?.trim() || 'Destination inconnue';

  const containerClass = cn(
    'group relative overflow-hidden rounded-2xl border bg-white/95 transition-all duration-200',
    disableDrag ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
    isDragging
      ? 'border-sky-300 shadow-xl shadow-sky-100/50 ring-2 ring-sky-200/80'
      : isSelected
        ? 'border-sky-200 shadow-md shadow-sky-100/40'
        : isPast
          ? 'border-emerald-100 bg-emerald-50/40'
          : 'border-slate-100 hover:border-sky-200 hover:shadow-md hover:shadow-sky-100/30',
  );

  const statusChipClass = cn(
    'inline-flex items-center rounded-full border px-2 py-[3px] text-[11px] font-medium',
    isPast
      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
      : 'border-sky-200 bg-sky-50 text-sky-600',
  );

  return (
    <div className={containerClass}>
      {isPast && (
        <div
          className="absolute inset-y-3 left-0 w-1 rounded-r-lg bg-emerald-300/70"
          aria-hidden="true"
        />
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className="w-full cursor-pointer px-4 py-[18px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-100 bg-sky-50 px-2 py-[3px] text-[11px] font-medium text-sky-600">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <time>{formattedDate}</time>
                </span>
                {transportDetail && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2 py-[3px] text-[11px] text-slate-600">
                    <TransportIconComponent className="h-3 w-3 text-slate-500" aria-hidden="true" />
                    {transportLabel}
                  </span>
                )}
                <span className={statusChipClass}>{isPast ? 'Terminé' : 'Planifié'}</span>
              </div>
              <h4 className="truncate text-sm font-semibold leading-snug text-slate-900">
                {destinationName}
              </h4>
              {dayItinerary.notes && !isExpanded && (
                <p className="truncate text-xs text-slate-500">{dayItinerary.notes}</p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 flex-row items-end gap-4 sm:flex-col sm:items-end">
            <div className="flex flex-col items-end gap-2">
              <div className={commentBadgeClass} title="Commentaires de cette étape">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{commentCount}</span>
              </div>
              {dayItinerary.id && onEdit && (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer text-slate-400 opacity-0 transition hover:bg-slate-100/80 hover:text-slate-600 group-hover:opacity-100"
                  onClick={handleEdit}
                  onKeyDown={handleEditKeyDown}
                  role="button"
                  tabIndex={0}
                  title="Modifier"
                >
                  <span className="flex h-full w-full items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60">
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Button>
              )}
            </div>
            <div className="flex items-center justify-end">
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu détaillé */}
      {isExpanded && (
        <div className="space-y-4 border-t border-slate-100 bg-slate-50/40 px-4 pb-5 pt-4">
          {/* Notes */}
          {dayItinerary.notes && (
            <div className="flex gap-3 rounded-xl border border-sky-100 bg-white/95 p-3 shadow-sm">
              <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <p className="text-sm leading-relaxed text-slate-600">{dayItinerary.notes}</p>
            </div>
          )}

          {/* Transport */}
          {transportType && (
            <div className="rounded-xl border border-sky-100 bg-white/95 p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-600">
                  <TransportIconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium capitalize text-slate-700">{transportLabel}</p>
                  {transportDuration && (
                    <p className="text-xs text-slate-500">{transportDuration}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Activités */}
          {dayItinerary.activities.length > 0 && (
            <div className="space-y-2">
              <h5 className="px-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                Activités
              </h5>
              <div className="space-y-2">
                {dayItinerary.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="space-y-3 rounded-xl border border-slate-100 bg-white/95 p-3 transition-colors hover:border-sky-100 hover:bg-sky-50/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h6 className="flex-1 text-sm font-medium leading-tight text-slate-800">
                        {activity.title}
                      </h6>
                      <div className="flex items-center gap-2">
                        {(activity.startTime || activity.endTime) && (
                          <span className="flex items-center gap-1 rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                            <Clock className="h-3 w-3" />
                            {activity.startTime && activity.endTime
                              ? `${activity.startTime} - ${activity.endTime}`
                              : activity.startTime || activity.endTime}
                          </span>
                        )}
                        {activity.category && (
                          <Badge
                            variant="secondary"
                            className="shrink-0 text-xs border-slate-200 bg-slate-100 text-slate-600"
                          >
                            {activity.category}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {(activity.description || activity.notes) && (
                      <div className="flex flex-col gap-2">
                        {activity.description && (
                          <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                            <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <p className="flex-1 leading-relaxed">{activity.description}</p>
                          </div>
                        )}
                        {activity.notes && (
                          <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                            <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <p className="flex-1 leading-relaxed">{activity.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commentaires */}
          {stepId && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Commentaires
                </h5>
                {areCommentsLoading && (
                  <span className="text-[11px] text-slate-400">Chargement…</span>
                )}
              </div>
              <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
                {areCommentsLoading ? (
                  <div className="space-y-2">
                    {[0, 1].map((placeholder) => (
                      <div
                        key={`comment-skeleton-${placeholder}`}
                        className="h-16 animate-pulse rounded-lg border border-sky-50 bg-gradient-to-r from-sky-50 via-white to-sky-50 shadow-sm"
                      />
                    ))}
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => renderComment(comment))
                ) : (
                  <p className="text-xs text-slate-500">
                    Soyez la première personne à laisser un commentaire.
                  </p>
                )}
              </div>

              <form
                onSubmit={handleCommentSubmit}
                className="space-y-3 rounded-xl border border-sky-100 bg-white/90 p-4 shadow-sm shadow-sky-100/40 transition hover:border-sky-200"
              >
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(event) => setCommentAuthor(event.target.value)}
                  placeholder="Nom (optionnel)"
                  className="w-full rounded-md border border-sky-100 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
                <textarea
                  value={commentContent}
                  onChange={(event) => setCommentContent(event.target.value)}
                  placeholder="Écrire un commentaire…"
                  rows={3}
                  className="w-full rounded-md border border-sky-100 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="icon"
                    aria-label="Envoyer le commentaire"
                    className="h-9 w-9 rounded-full bg-sky-600 text-white shadow-sm transition hover:bg-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1 disabled:opacity-60 disabled:hover:bg-sky-600"
                    disabled={isSubmittingComment || !commentContent.trim()}
                  >
                    {isSubmittingComment ? (
                      <span className="text-[11px] font-semibold tracking-widest">···</span>
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
