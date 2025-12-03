'use client';

import { useState } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function TaskStats() {
  const [showDialog, setShowDialog] = useState(false);
  const getActiveCount = useTaskStore((state) => state.getActiveCount);
  const getCompletedCount = useTaskStore((state) => state.getCompletedCount);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);

  const activeCount = getActiveCount();
  const completedCount = getCompletedCount();

  const handleClearCompleted = async () => {
    try {
      await clearCompleted();
      setShowDialog(false);
    } catch (error) {
      console.error('Failed to clear completed tasks:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border-t bg-muted/30">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {activeCount} {activeCount === 1 ? 'item' : 'items'} left
          </Badge>
          {completedCount > 0 && (
            <Badge variant="outline" className="px-3 py-1">
              {completedCount} completed
            </Badge>
          )}
        </div>

        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDialog(true)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Clear completed tasks"
          >
            Clear Completed
          </Button>
        )}
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear completed tasks?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {completedCount} completed{' '}
              {completedCount === 1 ? 'task' : 'tasks'}. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearCompleted}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear Tasks
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
