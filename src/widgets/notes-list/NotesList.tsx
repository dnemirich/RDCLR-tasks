import { Note, type NoteType } from 'entities/note';

import s from './notesList.module.scss';

type Props = {
  notes: NoteType[];
};

export const NotesList = ({ notes }: Props) => {
  return (
    <div className={s.listContainer}>
      <ul className={s.notesList}>
        {notes.map((note) => (
          <li key={note.id}>
            <Note {...note} />
          </li>
        ))}
      </ul>
    </div>
  );
};
