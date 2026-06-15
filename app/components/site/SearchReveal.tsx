import { SearchResult } from '@/lib/types/SearchResult';

type Props = {
  results: SearchResult;
  onSearchAgain: () => void;
};

export const SearchReveal = ({ results, onSearchAgain }: Props) => {
  return (
    <div className="text-center transition-opacity">
      <p className="text-2xl text-gray-200">{results.person.name}</p>
      <p className="my-3 text-lg text-gray-400">Parabéns, você tirou:</p>
      <p className="my-5 rounded-xl border-2 border-dashed border-amber-400/60 bg-amber-600/20 px-5 py-12 text-3xl font-bold text-amber-300 sm:text-4xl">
        {results.personMatched.name}
      </p>
      <button
        type="button"
        onClick={onSearchAgain}
        className="w-full rounded-lg border border-gray-600 bg-gray-800 p-3 text-sm font-medium text-gray-200 hover:bg-gray-700"
      >
        Buscar outro CPF
      </button>
    </div>
  );
};
