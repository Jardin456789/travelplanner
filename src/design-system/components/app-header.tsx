interface AppHeaderProps {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export function AppHeader({ title, description, startDate, endDate }: AppHeaderProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-600 mb-2">{description}</p>}
      <div className="text-xs text-gray-500">
        📅 {startDate} - {endDate}
      </div>
    </div>
  );
}
