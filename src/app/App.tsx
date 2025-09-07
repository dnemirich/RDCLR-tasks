import type { Book } from 'shared/utils/types.ts';

import { SearchForm } from 'features/search-books';
import { useCallback, useState } from 'react';
import { BookList } from 'widgets/BookList';

import s from './App.module.scss';

const API_URL = "https://www.googleapis.com/books/v1"

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = useCallback(async (query: string, signal: AbortSignal) => {
    try {
      const response = await fetch(`${API_URL}/volumes?q=${query}`, {signal});
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className={s.container}>
      <header>
        <SearchForm onSearch={handleSearch}/>
      </header>
      <main>
        <BookList books={books}/>
      </main>
    </div>
  );
}

export default App;
