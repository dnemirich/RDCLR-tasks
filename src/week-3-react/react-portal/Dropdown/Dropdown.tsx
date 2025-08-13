import s from './Dropdown.module.css'
import {useLayoutEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

const menuItems = ['item1', 'item2', 'item3', 'item4', 'item5']

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('menu')
    const [coords, setCoords] = useState({x: 0, y: 0})
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useLayoutEffect(() => {
        if (isOpen && buttonRef.current) {
            const {x, y, height} = buttonRef.current.getBoundingClientRect()
            setCoords({x, y: y + height})
        }

    }, [isOpen]);


    return (
        <div className={s.wrapper}>
            <button className={s.trigger} onClick={() => setIsOpen(prevState => !prevState)} ref={buttonRef}>{value}</button>

            {
                isOpen && createPortal(
                    <div className={s.dropdownContent} style={{left: 0, top: 0, transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`}}>
                        <ul className={s.dropdownList}>
                            {menuItems.map(item => <li className={s.dropdownItem} key={item} onClick={() => {
                                setValue(item);
                                setIsOpen(false);
                            }}>{item}</li>)}
                        </ul>
                    </div>,
                    document.body
                )
            }
        </div>
    )
}