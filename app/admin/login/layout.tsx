import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { pingAdmin } from '@/lib/api/server';

export default async function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const logged = await pingAdmin();
  if (logged) redirect('/admin');

  return (
    <div className="relative flex min-h-full items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1),transparent_55%)]" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
