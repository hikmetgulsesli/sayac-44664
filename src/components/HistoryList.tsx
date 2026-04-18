import type { HistoryItem } from '../types';
import { HistoryItemComponent } from './HistoryItem';

interface HistoryListProps {
  history: HistoryItem[];
}

export function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <section className="w-full flex flex-col gap-6">
        <h2 className="font-headline text-2xl font-bold text-on-surface">Son İşlemler</h2>
        <div className="flex flex-col items-center justify-center py-12 text-secondary">
          <span className="material-symbols-outlined text-4xl mb-2">history</span>
          <p className="font-label text-sm">Henüz işlem yapılmadı</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <h2 className="font-headline text-2xl font-bold text-on-surface">Son İşlemler</h2>
      <div className="flex flex-col gap-4">
        {history.map((item) => (
          <HistoryItemComponent key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
