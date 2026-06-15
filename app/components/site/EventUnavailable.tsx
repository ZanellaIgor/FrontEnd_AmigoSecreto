import Link from 'next/link';
import { PublicShell } from '@/app/components/layout/PublicShell';

type Props = {
  title?: string;
};

export const EventUnavailable = ({ title }: Props) => {
  return (
    <PublicShell
      title={title ?? 'Evento indisponível'}
      description="Este sorteio ainda não foi liberado pelo organizador. Tente novamente mais tarde."
      backHref="/"
      narrow
    >
      <div className="rounded-2xl border border-gray-700/80 bg-gray-900/80 p-6 text-center shadow-xl shadow-black/20">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-2xl">
          🎁
        </div>
        <p className="text-sm text-gray-400">
          Se você recebeu um link do organizador, confirme se ele está correto ou
          peça um novo envio.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
        >
          Ir para página inicial
        </Link>
      </div>
    </PublicShell>
  );
};
