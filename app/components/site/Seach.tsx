'use client';

import { useState } from 'react';
import { SearchResult } from '../types/SearchResul';
import { SearchForm } from './SearchForm';

type Props = {
  id: number;
};

export const Search = ({ id }: Props) => {
  const [results, setResults] = useState<SearchResult>();
  console.log(results);
  const handleSearchButton = async (cpf: string) => {};
  return (
    <section className="bg-gray-900 p-5 roounded">
      {!results && <SearchForm onSearchButton={handleSearchButton} />}
      {/*    {results && <SearchResults results={results} />} */}
    </section>
  );
};
