import {useState} from "react";
import {Modal} from "./Modal/Modal.tsx";
import {Dropdown} from "./Dropdown/Dropdown.tsx";
import {Tooltip} from "./Tooltip/Tooltip.tsx";

export const ReactPortalTask = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
            <h1 style={{textAlign:'center'}}>PORTALS</h1>
            <div>
                <button style={{backgroundColor: 'unset', width: '200px', height: '50px', fontSize: '18px'}} onClick={() => setShowModal(true)}>Show modal</button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <p>Some text inside modal</p>
                </Modal>
            </div>
            <div style={{marginBottom: '200px'}}>
                <Dropdown/>
            </div>
            <div>
                <Tooltip/>
            </div>
        </div>
    )
};
