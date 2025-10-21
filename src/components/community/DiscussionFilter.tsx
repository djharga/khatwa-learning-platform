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
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={currentFilter === filter.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
