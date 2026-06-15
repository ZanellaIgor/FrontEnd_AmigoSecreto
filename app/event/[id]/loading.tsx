import { PublicShell } from '@/app/components/layout/PublicShell';

export default function EventLoading() {
  return (
    <PublicShell narrow>
      <div className="animate-pulse space-y-4 rounded-2xl border border-gray-700/80 bg-gray-900/80 p-6">
        <div className="mx-auto h-4 w-32 rounded bg-gray-800" />
        <div className="mx-auto h-10 w-3/4 rounded bg-gray-800" />
        <div className="mx-auto h-4 w-full rounded bg-gray-800" />
        <div className="mt-6 h-14 rounded-xl bg-gray-800" />
        <div className="h-12 rounded-xl bg-gray-800" />
      </div>
    </PublicShell>
  );
}
