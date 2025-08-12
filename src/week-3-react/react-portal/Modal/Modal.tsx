import s from './Modal.module.css'
import type {ReactNode} from "react";
import {createPortal} from "react-dom";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({isOpen, onClose, children}: Props) => {
    return (
        <>
            {isOpen &&
                <>
                    {createPortal(<div className={s.overlay}>
                        <div className={s.content}>
                            <p className={s.title}>Modal</p>
                            <hr/>
                            {children}
                            <button className={s.button} onClick={onClose}>X</button>
                        </div>
                    </div>, document.body)}
                </>

            }
        </>

    )
}