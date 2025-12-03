import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Keyboard, Database, Zap, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Todo App
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About Todo App</h1>
        <p className="text-xl text-gray-600 mb-12">
          A modern, clean, and minimal todo list application
        </p>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <CheckCircle2 className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, edit, delete, and complete tasks with instant UI updates and optimistic rendering
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Zap className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Filtering</h3>
              <p className="text-gray-600">
                Filter tasks by status (all, active, completed) with bulk clear completed action
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Database className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Persistent Storage</h3>
              <p className="text-gray-600">
                MySQL database with Prisma ORM for reliable data persistence
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Keyboard className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Keyboard Shortcuts</h3>
              <p className="text-gray-600">
                Inline task editing with double-click, Enter to save, Escape to cancel
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Globe className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Mobile-first responsive design with accessibility features
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Zap className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smooth Animations</h3>
              <p className="text-gray-600">
                Smooth transitions and loading states for better user experience
              </p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm border space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Adding Tasks</h3>
              <p className="text-gray-600">
                Type your task in the input field and press Enter to add it to your list
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Completing Tasks</h3>
              <p className="text-gray-600">
                Click the circle checkbox next to a task to mark it as complete
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Editing Tasks</h3>
              <p className="text-gray-600">
                Double-click on any task to edit it inline. Press Enter to save or Escape to cancel
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Deleting Tasks</h3>
              <p className="text-gray-600">
                Hover over a task and click the trash icon to delete it
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Filtering Tasks</h3>
              <p className="text-gray-600">
                Use the filter buttons to view all, active, or completed tasks
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Clearing Completed</h3>
              <p className="text-gray-600">
                Click "Clear completed" to remove all completed tasks at once
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Next.js 14</strong> - React framework with App Router
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>TypeScript</strong> - Type-safe development
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Prisma</strong> - Next-generation ORM for MySQL
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Zustand</strong> - Lightweight state management
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>React Hook Form</strong> - Performant form validation
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Zod</strong> - Schema validation
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Tailwind CSS</strong> - Utility-first CSS framework
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Lucide React</strong> - Beautiful icon library
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Keyboard Shortcuts</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-semibold">Action</th>
                  <th className="text-left pb-3 font-semibold">Shortcut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3">Add new task</td>
                  <td className="py-3">
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Enter</kbd>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Edit task (when focused)</td>
                  <td className="py-3">
                    <span className="text-sm text-gray-600">Double-click</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Save edited task</td>
                  <td className="py-3">
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Enter</kbd>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Cancel editing</td>
                  <td className="py-3">
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Escape</kbd>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-sm text-gray-500 border-t">
        <p>Built with Next.js, Prisma, and Zustand</p>
      </footer>
    </div>
  )
}
