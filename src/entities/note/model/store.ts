import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { notesChannel } from 'shared/lib/broadcastChannel.ts';

import type { NoteType } from './type.ts';

import { addItem, getItems } from '../lib';

const senderId = crypto.randomUUID();

export const noteAddedLocally = createEvent<NoteType>();
export const noteAddedRemotely = createEvent<NoteType>();

export const NotesGate = createGate<void>();

const getNotesFx = createEffect<void, NoteType[]>(() => {
  return getItems();
});

const addNotesFx = createEffect<NoteType, void>((item) => {
  addItem(item);
});

const sendToBroadcastChannelFx = createEffect<
  { payload: NoteType; type: string },
  void
>((message) => notesChannel.postMessage(message));

export const $notes = createStore<NoteType[]>([])
  .on(getNotesFx.doneData, (_, note) => note)
  .on(noteAddedLocally, (state, note) => [note, ...state])
  .on(noteAddedRemotely, (state, note) => [note, ...state]);

notesChannel.addEventListener('message', (event) => {
  if (event.data.type !== 'add-note') return;
  if (event.data.senderId === senderId) return;
  noteAddedRemotely(event.data.payload);
});

sample({
  clock: NotesGate.open,
  target: getNotesFx,
});

sample({
  clock: noteAddedLocally,
  target: addNotesFx,
});

sample({
  clock: noteAddedLocally,
  fn: (note) => ({ payload: note, senderId, type: 'add-note' }),
  target: sendToBroadcastChannelFx,
});
