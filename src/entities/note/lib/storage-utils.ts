import type { NoteType } from '../model';

export const STORAGE_KEY = 'dnemirich-notes-list';

export const getItems = (): NoteType[] => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

export const addItem = (item: NoteType) => {
  const items = getItems();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...items]));
};
