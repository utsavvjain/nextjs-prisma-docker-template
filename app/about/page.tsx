import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const features = [
    {
      title: 'Task Management',
      description: 'Create, edit, delete, and complete tasks with instant UI updates',
    },
    {
      title: 'Smart Filtering',
      description: 'Filter tasks by status (all, active, completed) with URL persistence',
    },
    {
      title: 'Inline Editing',
      description: 'Double-click any task to edit it in place with keyboard shortcuts',
    },
    {
      title: 'Bulk Actions',
      description: 'Clear all completed tasks at once with confirmation dialog',
    },
    {
      title: 'Real-time Updates',
      description: 'Optimistic UI updates for instant feedback on all actions',
    },
    {
      title: 'Dark Mode',
      description: 'Beautiful dark theme with system preference detection',
    },
    {
      title: 'Responsive Design',
      description: 'Works seamlessly on mobile, tablet, and desktop devices',
    },
    {
      title: 'Accessibility',
      description: 'ARIA labels, keyboard navigation, and screen reader support',
    },
  ];

  const shortcuts = [
    { key: 'Enter', description: 'Add new task or save edit' },
    { key: 'Escape', description: 'Cancel editing' },
    { key: 'Double-click', description: 'Edit task inline' },
    { key: 'Space', description: 'Toggle task completion' },
    { key: 'Tab', description: 'Navigate between elements' },
  ];

  const techStack = [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Prisma',
    'MySQL',
    'Tailwind CSS',
    'shadcn/ui',
    'Zustand',
    'Zod',
    'react-hook-form',
    'date-fns',
    'next-themes',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Tasks
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About TodoList
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A clean, minimal todo list application built with modern web technologies
            to help you organize your daily tasks efficiently.
          </p>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <kbd className="px-3 py-1.5 bg-muted rounded text-sm font-mono">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Architecture Highlights</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Database-First Development</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Prisma ORM for type-safe database access with MySQL backend.
                  Schema-first approach ensures data integrity and type safety from database to UI.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Type-Safe API Layer</h3>
                <p className="text-sm text-muted-foreground">
                  RESTful API endpoints with Zod validation schemas ensure data consistency.
                  Comprehensive error handling with appropriate HTTP status codes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">State Management</h3>
                <p className="text-sm text-muted-foreground">
                  Zustand provides lightweight, performant state management with optimistic updates
                  for instant UI feedback.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Component Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Modular, reusable components following single responsibility principle.
                  Built with shadcn/ui for consistent, accessible design.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Use</h2>
          <Card>
            <CardContent className="pt-6">
              <ol className="space-y-3 list-decimal list-inside text-sm text-muted-foreground">
                <li>Type your task in the input field and press Enter or click "Add Task"</li>
                <li>Click the checkbox to mark a task as complete or incomplete</li>
                <li>Double-click any task text to edit it inline</li>
                <li>Use the filter tabs to view all, active, or completed tasks</li>
                <li>Hover over a task to reveal the delete button</li>
                <li>Click "Clear Completed" to remove all completed tasks at once</li>
                <li>Toggle dark mode using the theme button in the header</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-2xl font-bold mb-2">Ready to get organized?</h3>
              <p className="mb-4 opacity-90">Start managing your tasks today</p>
              <Link href="/">
                <Button variant="secondary" size="lg">
                  Go to Tasks
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
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
