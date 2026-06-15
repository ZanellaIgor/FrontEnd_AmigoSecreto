'use client';

import { deleteCookie } from 'cookies-next/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AppIcon } from '@/app/components/brand/AppIcon';

type Props = {
  logged: boolean;
};

const navItems = [
  {
    href: '/',
    label: 'Início',
    isActive: (pathname: string) => pathname === '/',
  },
  {
    href: '/admin',
    label: 'Painel',
    isActive: (pathname: string) => pathname.startsWith('/admin'),
  },
];

export const SiteHeaderClient = ({ logged }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token', { path: '/' });
    toast.success('Sessão encerrada');
    router.refresh();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800/80 bg-gray-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-600/10 ring-1 ring-amber-500/25 transition-colors group-hover:bg-amber-600/20"
          >
            <AppIcon size={22} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white transition-colors group-hover:text-amber-400">
              Amigo Secreto
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:block">
              Sorteios online
            </span>
          </span>
        </Link>

        <nav
          className="flex items-center gap-0.5 rounded-xl border border-gray-800/80 bg-gray-900/50 p-0.5"
          aria-label="Navegação principal"
        >
          {navItems.map(({ href, label, isActive }) => {
            const active = isActive(pathname);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  active
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center">
          {logged ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
            >
              Sair
            </button>
          ) : (
            <Link
              href="/admin/login"
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === '/admin/login'
                  ? 'bg-amber-600 text-white'
                  : 'border border-gray-700 text-gray-200 hover:border-gray-500 hover:bg-gray-800'
              }`}
              aria-current={pathname === '/admin/login' ? 'page' : undefined}
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
