import type { Book } from 'shared/utils/types.ts';

import s from './bookList.module.scss';

type Props = {
  books: Book[];
}

export const BookList = ({books}: Props) => {
  return (
    <div className={s.bookContainer}>
      {
        books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul className={s.bookList}>
          {books.map((book) => (
            <li className={s.book} key={book.id}>
              <p className={s.title}>{book.volumeInfo.title}</p>
              <p className={s.author}>{book.volumeInfo.authors}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
