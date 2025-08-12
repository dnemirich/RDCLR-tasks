import s from './Tooltip.module.css'
import {useRef, useState} from "react";
import {createPortal} from "react-dom";

export const Tooltip = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className={s.tooltipWrapper} ref={wrapperRef}>
            <p className={s.text} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>Hover on the text to see the tooltip</p>
            {
                showTooltip && createPortal(
                    <div className={s.tooltip}>
                        <p>Some text</p>
                    </div>,
                    wrapperRef.current!
                )
            }
        </div>
    )
}