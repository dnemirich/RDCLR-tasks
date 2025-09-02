import { useEffect, useState } from 'react';
import { notesChannel } from 'shared/lib/broadcastChannel.ts';

import type { NoteType } from '../model';

import { addItem, getItems } from './storage-utils.ts';

export const useNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    setNotes(getItems());

    const listener = (event: MessageEvent) => {
      if (event.data.type !== 'add-note') return;
      setNotes((prev) => [ event.data.payload, ...prev]);
    };
    notesChannel.addEventListener('message', listener);

    return () => notesChannel.removeEventListener('message', listener);
  }, []);

  const addNote = (note: NoteType) => {
    addItem(note);
    notesChannel.postMessage({ payload: note, type: 'add-note' });
    setNotes(getItems());
  };

  return { addNote, notes };
};
