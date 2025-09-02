import type { NotificationType } from '../model';

import s from './notification.module.scss';

type Props = {
  notification: NotificationType;
  onClose: () => void;
};

export const Notification = ({ notification, onClose }: Props) => {
  return (
    <div className={s.notification}>
      <button className={s.btn} onClick={onClose}>
        Close
      </button>
      <p className={s.heading}>A note was added on another tab:</p>
      <p className={s.content}>"{notification.text}"</p>
      <span className={s.date}>{notification.date}</span>
    </div>
  );
};
