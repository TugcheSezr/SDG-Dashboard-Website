'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './Button'

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
  } | null
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/overview" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              SDG Dashboard
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                href="/overview"
                className={`text-sm font-medium transition-colors ${
                  isActive('/overview')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Overzicht
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors ${
                  isActive('/contact')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Contact
              </Link>
              <Link
                href="/support"
                className={`text-sm font-medium transition-colors ${
                  isActive('/support')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Ondersteuning
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
                  {user.name || user.email}
                </span>
                <form action="/api/auth/signout" method="POST">
                  <Button type="submit" variant="outline" size="sm">
                    Uitloggen
                  </Button>
                </form>
              </>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Inloggen
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

