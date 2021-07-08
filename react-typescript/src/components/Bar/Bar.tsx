import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { toggle } from '../../utils/tools';
import './Bar.scss';

const Bar: React.FC<{ data: ToDos, callback: any }> = ({ data, callback }) => {
    const [open, setOpen] = useState<string>('hidden');

    return (
        <div id={`todos-${data.id}`} className="Bar">
            <div className="head">
                <div className="text">
                    {data.title}
                </div>
                <div className="icons">
                    <FaInfoCircle className="icon"
                        onClick={() => setOpen(toggle(open))} />
                    {data.complete ?
                        <FaCheck className="icon" onClick={
                            () => callback(data.id, 'updateStatus')} /> :
                        <FaTimes className="icon" onClick={
                            () => callback(data.id, 'updateStatus')} />}
                    <FaTrash className="icon"
                        onClick={() => callback(data.id, 'delete')} />
                </div>
            </div>
            <div className={`desc ${open}`}>
                <div className="text">
                    {data.description}
                </div>
            </div>
        </div>
    )
}

export default Bar;