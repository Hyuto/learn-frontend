import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { PassThrough } from 'stream';
import './Bar.scss';

const toggle = (status: string): string => {
    status = status === "hidden" ? "show" : "hidden";
    return status;
};

const Bar: React.FC<{ data: ToDos, update: string, callback: any }> =
    ({ data, update, callback }) => {
        const [open, setOpen] = useState<string>('hidden');

        return (
            <div id={`todos-${data.id}`} className="Bar">
                <div className="head" onClick={() => setOpen(toggle(open))}>
                    <div className="text">
                        {data.title}
                    </div>
                    <div className="icons">
                        {
                            data.complete ?
                                <FaCheck className="icon" onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        callback(data.id, 'updateStatus');
                                    }} /> :
                                <FaTimes className="icon" onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        callback(data.id, 'updateStatus');
                                    }} />
                        }
                        <FaTrash className="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                callback(data.id, 'delete');
                            }} />
                    </div>
                </div>
                <div className={`desc ${open}`}>
                    <div className="info">
                        <p className="sub-info">
                            <strong>Description</strong> : {data.description}
                        </p>
                        <p className="sub-info">
                            <strong>Deadline</strong> : {data.deadline ?
                                data.deadline : 'Not Listed'}
                        </p>
                        <p className="sub-info">
                            <strong>Status</strong> : {data.complete ? 'Finished' :
                                data.complete === false ? 'Not Finished' : 'Unknown'}
                        </p>
                    </div>
                    <div className={`update-btn ${update}`} onClick={() =>
                        update !== '' ? console.log("Clicked") : PassThrough}>
                        Update Data
                    </div>
                </div>
            </div>
        )
    }

export default Bar;