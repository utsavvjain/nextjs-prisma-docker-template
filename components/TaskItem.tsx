'use client';

import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { type Task } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleEditSubmit = async () => {
    if (editTitle.trim() === '') {
      setEditTitle(task.title);
      setIsEditing(false);
      return;
    }

    if (editTitle !== task.title) {
      try {
        await updateTask(task.id, { title: editTitle });
      } catch (error) {
        console.error('Failed to update task:', error);
        setEditTitle(task.title);
      }
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const relativeTime = formatDistanceToNow(new Date(task.created_at), {
    addSuffix: true,
  });

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-4 border-b transition-all duration-200",
        "hover:bg-accent/50",
        task.completed && "opacity-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleToggleComplete}
        aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        className="mt-1"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
            className="h-8"
            maxLength={200}
            aria-label="Edit task title"
          />
        ) : (
          <div
            onDoubleClick={handleDoubleClick}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDoubleClick();
              }
            }}
            aria-label={`Double-click to edit task: ${task.title}`}
          >
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Created {relativeTime}
            </p>
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className={cn(
          "text-destructive hover:text-destructive hover:bg-destructive/10 transition-opacity",
          !isHovered && "opacity-0"
        )}
        aria-label={`Delete task "${task.title}"`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </Button>
    </div>
  );
}
