import React, { useState } from 'react';

import s from './todolist.module.scss';

type SubmitFormProps = {
  handleSubmit: (task: string) => void;
};

type Task = {
  completed: boolean;
  id: number;
  text: string;
};

const SubmitForm = ({ handleSubmit }: SubmitFormProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (input) {
      handleSubmit(input.value);
      input.value = '';
    }
  };

  return (
    <form className={s.submitForm} onSubmit={onSubmit}>
      <input type="text" />
      <button type="submit">Add</button>
    </form>
  );
};

type TaskProps = {
  task: Task;
  toggleTask: (id: number) => void;
};

const Task = ({ task, toggleTask }: TaskProps) => {
  return (
    <li className={`${s.task} ${task.completed ? s.completed : ''}`}>
      <input
        defaultChecked={task.completed}
        id={`task-${task.id}`}
        onChange={() => toggleTask(task.id)}
        type={'checkbox'}
      />
      {task.text}
    </li>
  );
};

type TodolistProps = {
  listRef: React.RefObject<HTMLUListElement | null>;
};

export const Todolist = ({ listRef }: TodolistProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: string) => {
    setTasks([{ completed: false, id: Date.now(), text: task }, ...tasks]);
  };

  const toggleTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  return (
    <div className={s.todo}>
      <SubmitForm handleSubmit={addTask} />
      <ul className={s.taskList} ref={listRef}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} toggleTask={toggleTask} />
        ))}
      </ul>
    </div>
  );
};
