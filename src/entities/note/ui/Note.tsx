import type { NoteType } from '../model';

import s from './note.module.scss';

export const Note = (note: NoteType) => {
  return (
    <div className={s.noteCard}>
      <p className={s.text}>{note.content}</p>
    </div>
  );
};
