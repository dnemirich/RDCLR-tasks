import { useNotes } from 'entities/note';
import { AddForm } from 'features/add-note';
import {
  displayNotification,
  Notification,
  type NotificationType,
} from 'features/notify-note-creation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { NotesList } from 'widgets/notes-list';

import s from './App.module.scss';

function App() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { addNote, notes } = useNotes((note) =>
    setNotifications((prev) => [...prev, displayNotification(note)])
  );

  const onAddNote = (text: string) => {
    addNote({ content: text, id: new Date().toISOString() });
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className={s.container}>
      <h1>Notes</h1>
      <div className={s.wrapper}>
        <AddForm onSubmit={onAddNote} />
        <NotesList notes={notes} />
      </div>
      {notifications.length > 0 &&
        createPortal(
          <div className={s.notificationsContainer}>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                onClose={() => removeNotification(notification.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

export default App;
