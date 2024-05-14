export const PersonItem = () => {
  return <div>...</div>;
};

export const PersonItemSkeleton = () => {
  return (
    <div
      className="w-full h-16 bg-gray-700 rounded mb-3
    bg-gradient-to-r from-gray-900 to-gray-950  animate-pulse"
    />
  );
};

export const PersonItemNotFound = () => {
  return (
    <div className="text-center p-y4 text-gray-500">
      Não há grupos pessoas nesse grupo.
    </div>
  );
};
