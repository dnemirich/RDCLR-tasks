import { useNotes } from 'entities/note';
import { AddForm } from 'features/add-note';
import { NotesList } from 'widgets/notes-list';

import s from './App.module.scss';

function App() {
  const { addNote, notes } = useNotes();

  const onAddNote = (text: string) => {
    addNote({ content: text, id: new Date().toISOString() });
  };

  return (
    <div className={s.container}>
      <h1>Notes</h1>
      <div className={s.wrapper}>
        <AddForm onSubmit={onAddNote} />
        <NotesList notes={notes} />
      </div>
    </div>
  );
}

export default App;
