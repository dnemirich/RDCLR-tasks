import { useEffect, useState } from 'react';
import { notesChannel } from 'shared/lib/broadcastChannel.ts';

import type { NotificationType } from '../model';

import { displayNotification } from './notification-utils.ts';

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data.type !== 'add-note') return;
      setNotifications((prev) => [
        ...prev,
        displayNotification(event.data.payload),
      ]);
    };
    notesChannel.addEventListener('message', listener);
    return () => notesChannel.removeEventListener('message', listener);
  }, []);


  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }

  return { notifications, removeNotification };
};
