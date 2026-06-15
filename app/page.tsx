import Link from 'next/link';
import type { Metadata } from 'next';
import { PublicShell } from '@/app/components/layout/PublicShell';
import { pingAdmin } from '@/lib/api/server';

export const metadata: Metadata = {
  title: 'Amigo Secreto | Sorteios online',
  description:
    'Organize sorteios de amigo secreto com grupos, CPF e links para participantes.',
};

export default async function HomePage() {
  const logged = await pingAdmin();

  return (
    <PublicShell
      title="Sorteios simples, revelação segura"
      description="Organizadores gerenciam eventos no painel. Participantes descobrem quem tiraram usando o link e o CPF."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-gray-700/80 bg-gray-900/80 p-6 shadow-lg shadow-black/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Participante
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Recebeu um link?
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Abra o link enviado pelo organizador, informe seu CPF e veja quem você
            tirou no amigo secreto.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-700/80 bg-gray-900/80 p-6 shadow-lg shadow-black/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Organizador
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Vai criar um sorteio?
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Cadastre eventos, grupos e participantes. Libere o evento e compartilhe
            o link com cada pessoa.
          </p>
        </section>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {logged ? (
          <Link
            href="/admin"
            className="inline-flex w-full items-center justify-center rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-500 sm:w-auto"
          >
            Abrir painel admin
          </Link>
        ) : (
          <Link
            href="/admin/login"
            className="inline-flex w-full items-center justify-center rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-500 sm:w-auto"
          >
            Entrar como organizador
          </Link>
        )}
      </div>

      <ol className="mt-10 space-y-3 rounded-2xl border border-gray-800 bg-gray-950/50 p-5 text-sm text-gray-400">
        <li className="flex gap-3">
          <span className="font-semibold text-amber-400">1.</span>
          Organizador cria o evento e cadastra os participantes.
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-amber-400">2.</span>
          Após o sorteio, libera o evento e envia o link `/event/[id]`.
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-amber-400">3.</span>
          Cada participante consulta o resultado com o próprio CPF.
        </li>
      </ol>
    </PublicShell>
  );
}
