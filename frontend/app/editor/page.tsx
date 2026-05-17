'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditorRoot() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to personal info section by default
    router.push('/editor/personal');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-slate-600">Loading editor...</p>
    </div>
  );
}
