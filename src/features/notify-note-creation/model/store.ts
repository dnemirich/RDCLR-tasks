import { createEvent, createStore, sample } from 'effector';
import { noteAddedRemotely, type NoteType } from 'entities/note';

import type { NotificationType } from './types.ts';

import { displayNotification } from '../lib';

export const notificationAdded = createEvent<NoteType>();
export const notificationRemoved = createEvent<string>();

export const $notifications = createStore<NotificationType[]>([])
  .on(notificationAdded, (state, notification) => [
    ...state,
    displayNotification(notification),
  ])
  .on(notificationRemoved, (state, id) =>
    state.filter((notification) => notification.id !== id)
  );

sample({
  clock: noteAddedRemotely,
  target: notificationAdded,
});