import Link from 'next/link';
import { PublicShell } from '@/app/components/layout/PublicShell';

export default function NotFound() {
  return (
    <PublicShell
      title="Página não encontrada"
      description="O endereço pode estar incorreto ou o conteúdo foi removido."
      narrow
    >
      <div className="rounded-2xl border border-gray-700/80 bg-gray-900/80 p-8 text-center">
        <p className="text-6xl font-bold text-amber-500/80">404</p>
        <p className="mt-4 text-sm text-gray-400">
          Verifique o link ou volte para a página inicial.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-500"
          >
            Página inicial
          </Link>
          <Link
            href="/admin/login"
            className="rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 hover:bg-gray-800"
          >
            Área admin
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
