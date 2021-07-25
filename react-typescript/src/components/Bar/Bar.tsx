import React, { useState, useContext } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { Instance } from '../../utils/tools';
import { ContextData, UpdateData, DeleteData } from '../../utils/DataHandler';
import './Bar.scss';

const toggle = (status: string): string => {
    status = status === "hidden" ? "show" : "hidden";
    return status;
};

const Bar: React.FC<{ data: ToDos, callback: typeof Callback }> =
    ({ data, callback }) => {
        const { UpdateData, DeleteData } = useContext(ContextData);
        const [open, setOpen] = useState<string>('hidden');

        const Handler = async () => {
            data.complete = !data.complete;
            await Instance.put(`${data.id}/`, data).then((response) => {
                (UpdateData as UpdateData)(data.id, response.data);
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

        const status = getStatus(data);

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
                                    (DeleteData as DeleteData)(data.id);
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
                            <strong>Status</strong> : {data.complete ?
                                'Finished' : data.complete === false ?
                                    'Not Finished' : 'Unknown'}
                        </p>
                    </div>
                    <div className="update-btn" onClick={() => {
                        callback('update', data);
                    }}>
                        Update Data
                    </div>
                </div>
            </div>
        )
    }

export default Bar;