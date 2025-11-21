import { Button } from '@/components/ui';

/**
 * Props for the DiscussionFilter component
 */
interface DiscussionFilterProps {
  /** The currently selected filter ID */
  currentFilter: string;
  /** The callback when filter selection changes */
  onFilterChange: (filter: string) => void;
}

/**
 * Filter buttons for discussion board allowing users to filter posts by recent, popular, or unanswered. Highlights the currently active filter.
 */
export default function DiscussionFilter({ currentFilter, onFilterChange }: DiscussionFilterProps) {
  const filters = [
    { id: 'recent', label: 'الأحدث' },
    { id: 'popular', label: 'الأكثر تفاعلاً' },
    { id: 'unanswered', label: 'غير مجابة' },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            currentFilter === filter.id
              ? 'bg-white text-indigo-700 shadow-lg border-2 border-white'
              : 'bg-white/20 text-white hover:bg-white/30 border-2 border-white/30'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
