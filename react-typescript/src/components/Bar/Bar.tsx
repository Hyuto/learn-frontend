import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { Instance } from '../../utils/tools';
import './Bar.scss';

const toggle = (status: string): string => {
    status = status === "hidden" ? "show" : "hidden";
    return status;
};

const Bar: React.FC<{ data: ToDos, callback: any }> = ({ data, callback }) => {
    const [open, setOpen] = useState<string>('hidden');
    const [status, setStatus] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const Handler = async () => {
            const new_data = Object.assign({}, data)
            new_data.complete = !new_data.complete;
            await Instance.put(`${new_data.id}/`, new_data).then((response) => {
                callback(data.id, 'update');
            })
        }

        const getStatus = ({ complete }: ToDos): JSX.Element => {
            return complete ?
                <FaCheck className="icon" color="#17d2e8"
                    onClick={(e) => {
                        e.stopPropagation();
                        Handler();
                    }} /> :
                <FaTimes className="icon" color="gray"
                    onClick={(e) => {
                        e.stopPropagation();
                        Handler();
                    }} />
        }

        setStatus(getStatus(data));
    }, [data, callback])

    return (
        <div key={data.id} id={`todos-${data.id}`} className="Bar">
            <div className="head" onClick={() => setOpen(toggle(open))}>
                <div className="text">
                    {data.title}
                </div>
                <div className="icons">
                    {status}
                    <FaTrash className="icon" color="#e81d17"
                        onClick={async (e) => {
                            e.stopPropagation();
                            Instance.delete(`${data.id}/`).then(() => {
                                callback(data.id, 'delete');
                            });
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
                <div className="update-btn">
                    Update Data
                </div>
            </div>
        </div>
    )
}

export default Bar;