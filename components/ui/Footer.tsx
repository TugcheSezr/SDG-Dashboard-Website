export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">SDG Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Voortgang volgen van de Duurzame Ontwikkelingsdoelen
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Snelkoppelingen</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/overview" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Overzicht
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Ondersteuning
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Bronnen</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://sdgs.un.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  VN SDG&apos;s
                </a>
              </li>
              <li>
                <a
                  href="https://unstats.un.org/sdgs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  SDG Indicatoren
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} SDG Dashboard. Gebouwd voor educatieve doeleinden.
        </div>
      </div>
    </footer>
  )
}

