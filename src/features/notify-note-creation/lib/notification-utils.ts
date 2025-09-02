import type { NoteType } from 'entities/note';

import type { NotificationType } from '../model';

export const displayNotification = (note: NoteType): NotificationType => {
  const date = new Date(note.id).toLocaleString('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    year: 'numeric',
  });

  return { date: date, id: note.id, text: note.content };
};
