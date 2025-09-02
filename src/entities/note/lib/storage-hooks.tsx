import { useEffect, useState } from 'react';
import { notesChannel } from 'shared/lib/broadcastChannel.ts';

import type { NoteType } from '../model';

import { addItem, getItems } from './storage-utils.ts';

export const useNotes = (onSideAdd?: (note: NoteType) => void) => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    setNotes(getItems());

    const listener = (event: MessageEvent) => {
      if (event.data.type !== 'add-note') return;
      setNotes(getItems());
      onSideAdd?.(event.data.payload);
    };
    notesChannel.addEventListener('message', listener);

    return () => notesChannel.removeEventListener('message', listener);
  }, [onSideAdd]);

  const addNote = (note: NoteType) => {
    addItem(note);
    notesChannel.postMessage({ payload: note, type: 'add-note' });
    setNotes(getItems());
  };

  return { addNote, notes };
};
