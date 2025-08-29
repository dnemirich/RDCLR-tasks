import { LazyImagesLoading } from 'features/intersection-observer';
import { TodolistWrapper } from 'features/mutation-observer';
import { BlockSizeCalculation } from 'features/resize-observer';

import s from './App.module.scss';

function App() {
  return (
    <div className={s.container}>
      <LazyImagesLoading />
      <BlockSizeCalculation />
      <TodolistWrapper />
    </div>
  );
}

export default App;
