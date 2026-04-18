import type { HistoryItem } from '../types';
import { formatTimestamp, getActionLabel } from '../utils/storage';

interface HistoryItemProps {
  item: HistoryItem;
}

function getActionIcon(action: HistoryItem['action']): string {
  switch (action) {
    case 'increment':
      return 'add';
    case 'decrement':
      return 'remove';
    case 'reset':
      return 'refresh';
    default:
      return 'circle';
  }
}

function getActionIconClasses(action: HistoryItem['action']): string {
  switch (action) {
    case 'increment':
      return 'bg-primary-container/10 text-primary-container';
    case 'decrement':
      return 'bg-surface-variant text-on-surface-variant';
    case 'reset':
      return 'bg-[#DC2626]/10 text-[#DC2626]';
    default:
      return 'bg-surface-variant text-on-surface-variant';
  }
}

export function HistoryItemComponent({ item }: HistoryItemProps) {
  const icon = getActionIcon(item.action);
  const iconClasses = getActionIconClasses(item.action);
  const label = getActionLabel(item.action);
  const timestamp = formatTimestamp(item.timestamp);

  return (
    <div className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconClasses}`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-label text-sm font-bold text-on-surface">{label}</span>
          <span className="font-label text-xs text-secondary tracking-wide uppercase">{timestamp}</span>
        </div>
      </div>
      <div className="font-display text-xl font-bold text-on-surface">{item.value}</div>
    </div>
  );
}
