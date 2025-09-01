import { useEffect, useState } from 'react';

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
    setNotes(getItems());
  };

  return { addNote, notes };
};
