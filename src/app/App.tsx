import { useGate, useUnit } from 'effector-react';
import { $notes, noteAddedLocally, NotesGate } from 'entities/note';
import { AddForm } from 'features/add-note';
import { $notifications, Notification, notificationRemoved } from 'features/notify-note-creation';
import { createPortal } from 'react-dom';
import { NotesList } from 'widgets/notes-list';

import s from './App.module.scss';

function App() {
  useGate(NotesGate);

  const [notes, notifications, removeNotification, addNote] = useUnit([$notes, $notifications, notificationRemoved, noteAddedLocally]);

  const onAddNote = (text: string) => {
    addNote({ content: text, id: new Date().toISOString() });
  };

  const onRemoveNotification = (id: string) => {
    removeNotification(id);
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
                onClose={() => onRemoveNotification(notification.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

export default App;
