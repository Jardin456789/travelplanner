interface AppHeaderProps {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  currentDay?: number;
  totalDays?: number;
  nextDestination?: string;
  nextDateLabel?: string;
}

export function AppHeader({
  title,
  description,
  startDate,
  endDate,
  currentDay = 0,
  totalDays = 0,
  nextDestination,
  nextDateLabel,
}: AppHeaderProps) {
  const phrasesToOmit = ['voyage de test', 'test de voyage'];
  const normalize = (value?: string) => value?.trim().toLowerCase() ?? '';
  const displayTitle = normalize(title)
    ? phrasesToOmit.includes(normalize(title))
      ? ''
      : title
    : '';
  const displayDescription = normalize(description)
    ? phrasesToOmit.includes(normalize(description))
      ? ''
      : description
    : '';
  const clampedTotalDays = Math.max(totalDays, 0);
  const clampedCurrentDay =
    clampedTotalDays === 0
      ? 0
      : Math.min(Math.max(currentDay, 0), clampedTotalDays);
  const progress =
    clampedTotalDays > 0
      ? Math.min(100, Math.round((clampedCurrentDay / clampedTotalDays) * 100))
      : 0;
  const statusLabel =
    clampedTotalDays > 0
      ? `Jour ${clampedCurrentDay} sur ${clampedTotalDays}`
      : 'Préparation en cours';
  const dateRangeLabel =
    startDate && endDate
      ? startDate === endDate
        ? `Le ${startDate}`
        : `Du ${startDate} au ${endDate}`
      : '';

  return (
    <section className='rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50 to-sky-100/60 px-5 py-4 shadow-sm backdrop-blur'>
      <div className='space-y-3'>
        <div className='space-y-1.5'>
          <h3 className='text-lg font-semibold text-slate-900 leading-snug'>
            {displayTitle || 'Votre séjour'}
          </h3>
          <span className='inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-3 py-1 text-[11px] font-medium text-sky-700'>
            <span className='h-2.5 w-2.5 rounded-full bg-sky-500' />
            {statusLabel}
          </span>
          {dateRangeLabel && (
            <p className='text-xs text-slate-500'>{dateRangeLabel}</p>
          )}
          {displayDescription && (
            <p className='text-sm text-slate-600 leading-relaxed'>
              {displayDescription}
            </p>
          )}
        </div>
      </div>

      <div className='mt-4 space-y-2'>
        <div className='flex items-center justify-between text-[11px] font-medium text-slate-600'>
          <span>Progression du séjour</span>
          <span className='inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-slate-700 shadow-sm'>
            {progress}%
          </span>
        </div>
        <div className='relative h-2 w-full overflow-hidden rounded-full bg-white/60'>
          <span
            className='absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-indigo-500 transition-all'
            style={{ width: `${progress}%` }}
            aria-hidden
          />
          <span className='sr-only'>{`Progression du voyage : ${progress}%`}</span>
        </div>
      </div>

      {nextDestination && (
        <div className='mt-4 flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-xs text-slate-600 shadow-sm'>
          <div className='flex items-center gap-3'>
            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-sm text-white'>
              →
            </span>
            <div>
              <p className='text-[11px] uppercase tracking-wide text-slate-400'>
                Prochaine étape
              </p>
              <p className='text-sm font-semibold text-slate-800'>
                {nextDestination}
              </p>
            </div>
          </div>
          {nextDateLabel && (
            <span className='text-sm font-medium text-slate-700'>
              {nextDateLabel}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
