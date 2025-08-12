import s from './Dropdown.module.css'
import {useRef, useState} from "react";
import {createPortal} from "react-dom";

const menuItems = ['item1', 'item2', 'item3', 'item4', 'item5']

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('menu')
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className={s.wrapper} ref={wrapperRef}>
            <button className={s.trigger} onClick={() => setIsOpen(prevState => !prevState)}>{value}</button>

            {
                isOpen && createPortal(
                    <div className={s.dropdownContent}>
                        <ul className={s.dropdownList}>
                            {menuItems.map(item => <li className={s.dropdownItem} key={item} onClick={() => {
                                setValue(item);
                                setIsOpen(false);
                            }}>{item}</li>)}
                        </ul>
                    </div>,
                    wrapperRef.current!
                )
            }
        </div>
    )
}