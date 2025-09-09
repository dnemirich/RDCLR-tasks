import { useUnit } from 'effector-react';
import { SearchForm } from 'features/search-books';
import { $books } from 'shared/store/store.ts';
import { BookList } from 'widgets/BookList';

import s from './App.module.scss';

function App() {
  const books = useUnit($books);

  return (
    <div className={s.container}>
      <header>
        <SearchForm />
      </header>
      <main>
        <BookList books={books} />
      </main>
    </div>
  );
}

export default App;
