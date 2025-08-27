import { Game } from 'entities/game';
import { createGameModel } from 'entities/game';

import s from './App.module.scss';

function App() {
  const game1 = createGameModel('game1');
  const game2 = createGameModel('game2');

  return (
    <div className={s.container}>
      <Game model={game1} />
      <Game model={game2} />
    </div>
  );
}

export default App;
