'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { type FilterType } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function FilterTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
    fetchTasks(filter);

    // Update URL query params
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'all') {
      params.delete('status');
    } else {
      params.set('status', filter);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="flex gap-2 p-1 bg-muted rounded-lg"
      role="tablist"
      aria-label="Task filters"
    >
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant="ghost"
          onClick={() => handleFilterChange(filter.value)}
          className={cn(
            "flex-1 transition-all duration-200",
            currentFilter === filter.value &&
              "bg-background shadow-sm hover:bg-background"
          )}
          role="tab"
          aria-selected={currentFilter === filter.value}
          aria-label={`Show ${filter.label.toLowerCase()} tasks`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
