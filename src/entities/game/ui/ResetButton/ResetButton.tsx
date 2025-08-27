import s from './ResetButton.module.scss';

type Props = {
  onClick: () => void;
};

export const ResetButton = ({ onClick }: Props) => {
  return (
    <button className={s.resetBtn} onClick={onClick}>
      Reset
    </button>
  );
};
