import React, { useState, useContext } from "react";
import './AddUpdate.scss'
import { useForm } from "react-hook-form";
import { Instance } from "../../utils/tools";
import { ContextData, SetData } from "../../utils/DataHandler";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const typeform = "Create"

const AddUpdate: React.FC<{ className: string, callback: typeof Callback }> =
    ({ className, callback }) => {
        const { data, setData } = useContext(ContextData);
        const { register, handleSubmit } = useForm();
        const [status, setStatus] = useState('close');
        const [statusIcon, setStatusIcon] = useState<JSX.Element[] | null>(null);

        const makeMessage = (status: string, message: string) => {
            const elements: JSX.Element[] = [];

            if (status === 'success')
                elements.push(<FaCheckCircle color='green' />);
            else
                elements.push(<ImCross color='red' />);
            elements.push(<div>{message}</div>);

            return elements;
        }

        const onSubmit = async (new_data: ToDos) => {
            await Instance.post('.', new_data).then(res => {
                (data as ToDos[]).push(res.data);
                (setData as SetData)(data as ToDos[]);

                setStatus('open');
                setStatusIcon(makeMessage('success', res.statusText));
            }).catch((reason) => {
                setStatus('open');
                setStatusIcon(makeMessage('fail', reason));
            })
        };

        return (
            <div className={`new-update ${className}`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Title</label>
                    <input {...register("title",
                        { required: true, maxLength: 200 })} />

                    <label>Description</label>
                    <input {...register("description", { required: true })} />

                    <label>Status</label>
                    <input type="checkbox" {...register("complete",
                        { setValueAs: value => false })} />

                    <label>Deadline</label>
                    <input type="date" {...register("deadline",
                        { setValueAs: value => null })} />

                    <div className="btn-wrapper">
                        <input className="btn submit" type="submit"
                            alt={typeform} />
                        <div className="btn cancel" onClick={() => {
                            callback('close');
                        }}>
                            Cancel
                        </div>
                    </div>
                    <div className={`status ${status}`} onClick={() =>
                        callback('close')}>
                        {statusIcon}
                    </div>
                </form>
            </div>
        )
    }

export default AddUpdate;