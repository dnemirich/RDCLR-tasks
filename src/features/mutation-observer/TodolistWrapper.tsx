import { useEffect, useRef, useState } from 'react';

import { Todolist } from './Todolist/Todolist.tsx';
import s from './todolistWrapper.module.scss';

export const TodolistWrapper = () => {
  const [tasksAdded, setTasksAdded] = useState<number>(0);
  const [tasksDone, setTasksDone] = useState<number>(0);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const observer = new MutationObserver((mutations) => {
      let added = 0;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          added += mutation.addedNodes.length;

          if (added > 0) setTasksAdded((prevState) => prevState + added);
        }

        const done = listRef.current
          ? listRef.current.querySelectorAll('input[type="checkbox"]:checked')
              .length
          : 0;
        setTasksDone(done);
      });
    });

    observer.observe(listRef.current, {
      attributeFilter: ['checked'],
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.taskContainer}>
      <h2>Todolist</h2>
      <div>
        <p>Tasks added: {tasksAdded}</p>
        <p>Tasks done: {tasksDone}</p>
      </div>
      <Todolist listRef={listRef} />
    </div>
  );
};
