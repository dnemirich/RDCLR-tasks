import React, { useState } from 'react';

import s from './addForm.module.scss';

type Props = {
  onSubmit: (text: string) => void;
};

export const AddForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;

    onSubmit(value);
    setValue('');
  };

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <textarea onChange={(e) => setValue(e.target.value)} value={value} />
      <button type="submit">Add</button>
    </form>
  );
};
