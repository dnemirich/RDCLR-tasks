import { useEffect, useState } from 'react';
import { notesChannel } from 'shared/lib/broadcastChannel.ts';

import type { NoteType } from '../model';

import { addItem, getItems } from './storage-utils.ts';

export const useNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const items = getItems();
    setNotes(items);
  }, []);

  const addNote = (note: NoteType) => {
    addItem(note);
    notesChannel.postMessage({ payload: note, type: 'add-note' });
    setNotes(getItems());
  };

  return { addNote, notes };
};
