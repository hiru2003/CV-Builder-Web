'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const sections = [
    { name: 'Personal Info', href: '/editor/personal' },
    { name: 'Experience', href: '/editor/experience' },
    { name: 'Education', href: '/editor/education' },
    { name: 'Skills', href: '/editor/skills' },
    { name: 'Projects', href: '/editor/projects' },
    { name: 'Templates', href: '/editor/templates' },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">CV Builder</h1>
        <p className="text-sm text-slate-500 mt-1">Create your perfect resume</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className={cn(
                  'block px-4 py-3 rounded-lg transition-colors',
                  pathname === section.href
                    ? 'bg-blue-100 text-blue-900 font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                {section.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Preview Button */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={() => router.push('/editor/preview')}
          className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
        >
          View Preview
        </button>
      </div>
    </aside>
  );
}
