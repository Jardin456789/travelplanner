'use client';

import { useState, useCallback, type SyntheticEvent, type KeyboardEvent as ReactKeyboardEvent, type FormEvent, type ButtonHTMLAttributes } from 'react';
import { DayItinerary, TransportType } from '@/types/travel';
import {
  ChevronDown,
  Calendar,
  GripVertical,
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
  Pencil
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { useStepComments, useCreateComment } from '@/hooks/useTravelQueries';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

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
  dragHandleProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  isDragging?: boolean;
  disableDrag?: boolean;
}

export default function ItineraryCard({
  dayItinerary,
  isSelected = false,
  isPast = false,
  onSelect,
  onEdit,
  dragHandleProps,
  isDragging = false,
  disableDrag = false,
}: ItineraryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
 
  const formattedDate = formatDate(dayItinerary.date);
  const transportType = dayItinerary.transportToNext?.type as TransportType | undefined;
  const transportDetail = transportType ? transportDetails[transportType] : undefined;
  const TransportIconComponent = transportDetail?.Icon ?? Car;
  const transportLabel = transportDetail?.label ?? (transportType ? transportType.charAt(0).toUpperCase() + transportType.slice(1) : '');
  const stepId = dayItinerary.id;
  const { data: comments = [], isLoading: areCommentsLoading } = useStepComments(stepId);
  const createCommentMutation = useCreateComment();
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const isSubmittingComment = createCommentMutation.isPending;

  const toggleExpanded = useCallback(() => {
    setIsExpanded((previous) => !previous);
    onSelect?.();
  }, [onSelect]);

  const handleEdit = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      onEdit?.();
    },
    [onEdit]
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
    [handleEdit, onEdit]
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleExpanded();
      }
    },
    [toggleExpanded]
  );

  const handleCommentSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!stepId || !commentContent.trim()) {
        return;
      }

      try {
        await createCommentMutation.mutateAsync({
          stepId,
          author: commentAuthor.trim() || undefined,
          content: commentContent.trim(),
        });
        setCommentContent('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
      }
    },
    [stepId, commentAuthor, commentContent, createCommentMutation]
  );

  const containerClass = [
    'group relative rounded-lg border transition-all duration-200',
    isDragging
      ? 'bg-blue-50/40 border-blue-200 shadow-lg shadow-blue-100/30'
      : isSelected
      ? 'bg-blue-50/30 border-blue-200/50 shadow-sm shadow-blue-100/20'
      : isPast
      ? 'bg-green-50/20 border-green-200/40'
      : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm',
  ].join(' ');

  const handleClass = (() => {
    if (disableDrag) {
      return 'border-transparent bg-transparent text-transparent pointer-events-none';
    }
    if (isDragging || isSelected) {
      return 'border-blue-300 bg-blue-50 text-blue-600 shadow-sm cursor-grabbing';
    }
    return 'border-gray-200 bg-gray-50 text-gray-400 group-hover:text-gray-600 group-hover:border-gray-300 cursor-grab active:cursor-grabbing';
  })();

  return (
    <div className={containerClass}>
      {/* Indicateur de statut */}
      {isPast && (
        <div className="absolute -left-1 top-4 h-8 w-1 rounded-r-full bg-emerald-400/60" />
      )}

      {/* En-tête */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className="w-full cursor-pointer p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Poignée de réorganisation */}
            <button
              type="button"
              aria-label="Réordonner cette étape"
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${handleClass}`}
              disabled={disableDrag}
              {...dragHandleProps}
              onPointerDownCapture={(event) => event.stopPropagation()}
              onPointerUpCapture={(event) => event.stopPropagation()}
              onKeyDownCapture={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            >
              <GripVertical className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            {/* Contenu principal */}
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-semibold text-sm leading-none tracking-tight truncate text-gray-800">
                {dayItinerary.destination?.name || 'Destination inconnue'}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <time>{formattedDate}</time>
              </div>
              {dayItinerary.notes && (
                <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50/80 px-2.5 py-2 text-xs text-amber-800 shadow-sm">
                  <StickyNote className="h-3.5 w-3.5 shrink-0 text-amber-500 mt-0.5" />
                  <p className="flex-1 leading-relaxed">
                    {dayItinerary.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {dayItinerary.id && onEdit && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-7 w-7 cursor-pointer text-gray-400 hover:text-blue-600 hover:bg-blue-50/60"
                onClick={handleEdit}
                onKeyDown={handleEditKeyDown}
                role="button"
                tabIndex={0}
                title="Modifier"
              >
                <span className="flex h-full w-full items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60">
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Button>
            )}
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Contenu détaillé */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 pt-4 pb-4 space-y-4 bg-gray-50/30">
          {/* Notes */}
          {dayItinerary.notes && (
            <div className="flex gap-3 p-3 rounded-lg bg-white border border-gray-100">
              <StickyNote className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {dayItinerary.notes}
              </p>
            </div>
          )}

          {/* Transport */}
          {transportType && (
            <div className="rounded-lg border border-gray-100 bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 border border-gray-200">
                  <TransportIconComponent className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium capitalize text-gray-700">
                    {transportLabel}
                  </p>
                  {dayItinerary.transportToNext.duration && (
                    <p className="text-xs text-gray-500">
                      {dayItinerary.transportToNext.duration}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Activités */}
          {dayItinerary.activities.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium uppercase tracking-wider text-gray-400 px-1">
                Activités
              </h5>
              <div className="space-y-2">
                {dayItinerary.activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="rounded-lg border border-gray-100 bg-white p-3 space-y-3 hover:border-blue-100 hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h6 className="text-sm font-medium leading-tight flex-1 text-gray-800">
                        {activity.title}
                      </h6>
                      <div className="flex items-center gap-2">
                        {(activity.startTime || activity.endTime) && (
                          <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-100">
                            <Clock className="h-3 w-3" />
                            {activity.startTime && activity.endTime
                              ? `${activity.startTime} - ${activity.endTime}`
                              : activity.startTime || activity.endTime}
                          </span>
                        )}
                        {activity.category && (
                          <Badge variant="secondary" className="text-xs shrink-0 bg-gray-100 text-gray-600 border-gray-200">
                            {activity.category}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {(activity.description || activity.notes) && (
                      <div className="flex flex-col gap-2">
                        {activity.description && (
                          <div className="flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50/80 px-3 py-2 text-xs text-blue-900">
                            <StickyNote className="h-3.5 w-3.5 shrink-0 text-blue-500 mt-0.5" />
                            <p className="flex-1 leading-relaxed">{activity.description}</p>
                          </div>
                        )}
                        {activity.notes && (
                          <div className="flex items-start gap-2 rounded-md border border-purple-100 bg-purple-50/70 px-3 py-2 text-xs text-purple-900">
                            <StickyNote className="h-3.5 w-3.5 shrink-0 text-purple-500 mt-0.5" />
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
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h5 className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Commentaires
                </h5>
                {areCommentsLoading && (
                  <span className="text-[11px] text-gray-400">Chargement…</span>
                )}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto rounded-lg border border-gray-100 bg-white p-3">
                {areCommentsLoading ? (
                  <div className="space-y-2">
                    {[0, 1].map((placeholder) => (
                      <div
                        key={`comment-skeleton-${placeholder}`}
                        className="space-y-2 rounded-md border border-gray-100 bg-gray-50/80 p-2 animate-pulse"
                      >
                        <div className="h-3 w-24 rounded bg-gray-200" />
                        <div className="h-8 rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-md border border-gray-100 bg-gray-50/80 p-3"
                    >
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-medium text-gray-700">
                          {comment.author?.trim() || 'Invité'}
                        </span>
                        <span>
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    Soyez la première personne à laisser un commentaire.
                  </p>
                )}
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(event) => setCommentAuthor(event.target.value)}
                  placeholder="Votre nom (optionnel)"
                  className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300"
                />
                <div className="flex items-start gap-2">
                  <textarea
                    value={commentContent}
                    onChange={(event) => setCommentContent(event.target.value)}
                    placeholder="Ajoutez un commentaire pour cette étape…"
                    rows={2}
                    className="min-h-[72px] w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="shrink-0 px-3"
                    disabled={isSubmittingComment || !commentContent.trim()}
                  >
                    {isSubmittingComment ? 'Envoi…' : 'Envoyer'}
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
