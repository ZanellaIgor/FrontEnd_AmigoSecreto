export default function AdminPanelLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 rounded bg-gray-800" />
          <div className="h-4 w-56 rounded bg-gray-800" />
        </div>
        <div className="h-11 w-11 rounded-full bg-gray-800" />
      </div>
      <div className="space-y-3">
        <div className="h-24 rounded-xl bg-gray-800" />
        <div className="h-24 rounded-xl bg-gray-800" />
      </div>
    </div>
  );
}
