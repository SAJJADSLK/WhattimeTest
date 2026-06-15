import { useState } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663685753987/jbVr5R7iZyNr82uvFXU7st/whattime-icon-gd9dA8fSGqFXBABhPzefAD.webp';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
    { code: 'he', name: 'עברית' },
  ];

  const navItems = [
    { label: 'World Clock', href: '/world-clock' },
    { label: 'Converter', href: '/converter' },
    { label: 'Meeting Invites', href: '/meeting-invite' },
    { label: 'Countdown', href: '/countdown' },
    { label: 'DST Tracker', href: '/dst-tracker' },
    { label: 'Team Dashboard', href: '/team-dashboard' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/">
            <span className="flex items-center gap-2 font-bold text-lg cursor-pointer whitespace-nowrap">
              <img src={LOGO_URL} alt="WhatTime" className="w-8 h-8 flex-shrink-0" />
              <span className="hidden xs:inline">WhatTime</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="rounded-full"
              >
                <Globe className="w-5 h-5" />
              </Button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-accent ${
                        i18n.language === lang.code ? 'bg-accent font-semibold' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border bg-background">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className="block px-4 py-3 border-b border-border hover:bg-accent text-sm cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
          <Link href="/">
            <span className="flex items-center gap-2 font-bold text-lg cursor-pointer whitespace-nowrap">
              <img src={LOGO_URL} alt="WhatTime" className="w-8 h-8 flex-shrink-0" />
              WhatTime
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="block px-3 py-2 text-sm hover:bg-accent rounded-md cursor-pointer">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="rounded-full"
              >
                <Globe className="w-5 h-5" />
              </Button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-accent ${
                        i18n.language === lang.code ? 'bg-accent font-semibold' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
