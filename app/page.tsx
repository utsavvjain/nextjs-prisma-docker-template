'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTaskStore } from '@/stores/taskStore';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { FilterTabs } from '@/components/FilterTabs';
import { TaskStats } from '@/components/TaskStats';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const error = useTaskStore((state) => state.error);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TodoList</h1>
            <p className="text-sm text-muted-foreground">
              Organize your tasks efficiently
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What needs to be done today?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-6">
            Add tasks, mark them complete, and stay organized. Double-click to edit.
          </p>
        </section>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Task Input */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <TaskInput />
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="mb-4">
          <FilterTabs />
        </div>

        {/* Task List */}
        <Card className="mb-4">
          <TaskList />
          <TaskStats />
        </Card>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> to add task •{' '}
            <kbd className="px-2 py-1 bg-muted rounded">Double-click</kbd> to edit •{' '}
            <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd> to cancel
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, React, TypeScript, Prisma, and MySQL</p>
        </div>
      </footer>
    </div>
  );
}
