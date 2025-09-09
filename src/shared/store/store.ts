import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';

import type { Book } from '../utils/types.ts';

const API_URL = 'https://www.googleapis.com/books/v1';

let controller: AbortController | null = null;

export const queryChanged = createEvent<string>();

export const fetchBooksFx = createEffect<string, Book[]>(async (query) => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();

  try {
    const response = await fetch(`${API_URL}/volumes?q=${query}`, {
      signal: controller.signal,
    });

    const data = await response.json();
    return data.items ?? [];
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return []
    }
    throw err;
  }
});

export const $query = createStore('').on(queryChanged, (_, query) => query);

const debouncedQueryChanged = debounce({
  source: queryChanged,
  timeout: 500,
});

export const $books = createStore<Book[]>([])
  .on(fetchBooksFx.doneData, (_, books) => books)

sample({
  clock: debouncedQueryChanged,
  filter: (query) => query.trim().length > 0,
  source: $query,
  target: fetchBooksFx,
});
