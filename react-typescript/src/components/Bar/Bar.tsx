import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { Instance } from '../../utils/tools';
import './Bar.scss';

const toggle = (status: string): string => {
    status = status === "hidden" ? "show" : "hidden";
    return status;
};

const Bar: React.FC<{ data: ToDos, callback: any }> = ({ data, callback }) => {
    const [data_, setData] = useState<ToDos>(Object.assign({}, data));
    const [open, setOpen] = useState<string>('hidden');

    const Handler = async () => {
        data_.complete = !data_.complete;
        await Instance.put(`${data_.id}/`, data_).then((response) => {
            setData(response.data);
            setStatus(getStatus());
        })
    }

    const getStatus = (): JSX.Element => {
        return data_.complete ?
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

    const [status, setStatus] = useState<JSX.Element>(getStatus());

    return (
        <div id={`todos-${data_.id}`} className="Bar">
            <div className="head" onClick={() => setOpen(toggle(open))}>
                <div className="text">
                    {data_.title}
                </div>
                <div className="icons">
                    {status}
                    <FaTrash className="icon" color="#e81d17"
                        onClick={async (e) => {
                            e.stopPropagation();
                            Instance.delete(`${data_.id}/`).then(response => {
                                console.log(response);
                                callback(data_.id, 'delete');
                            });
                        }} />
                </div>
            </div>
            <div className={`desc ${open}`}>
                <div className="info">
                    <p className="sub-info">
                        <strong>Description</strong> : {data_.description}
                    </p>
                    <p className="sub-info">
                        <strong>Deadline</strong> : {data_.deadline ?
                            data_.deadline : 'Not Listed'}
                    </p>
                    <p className="sub-info">
                        <strong>Status</strong> : {data_.complete ? 'Finished' :
                            data_.complete === false ? 'Not Finished' : 'Unknown'}
                    </p>
                </div>
                <div className={`update-btn`}>
                    Update Data
                </div>
            </div>
        </div>
    )
}

export default Bar;