import React, { useState, useContext, useEffect } from "react";
import './AddUpdate.scss'
import { useForm } from "react-hook-form";
import { Instance } from "../../utils/tools";
import { ContextData, SetData } from "../../utils/DataHandler";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

interface WindowType {
    type: string;
    data?: ToDos;
}

const AddUpdate: React.FC<{
    className: string, callback: typeof Callback,
    typeform: WindowType
}> = ({ className, callback, typeform }) => {
    const { data, setData } = useContext(ContextData);
    const { register, handleSubmit, reset } = useForm<ToDos>();
    const [status, setStatus] = useState('close');
    const [statusIcon, setStatusIcon] = useState<JSX.Element[] | null>(null);

    const makeMessage = (status: string, message: string) => {
        const elements: JSX.Element[] = [];

        if (status === 'success')
            elements.push(<FaCheckCircle key="icon" className="icons"
                size={40} color='green' />);
        else
            elements.push(<ImCross key="icon" className="icons"
                size={40} color='red' />);
        elements.push(<div key="message" className="message">{message}</div>);

        return elements;
    }

    const onSubmit = async (new_data: ToDos) => {
        if (typeform.type === 'Create') {
            await Instance.post('.', new_data).then(res => {
                (data as ToDos[]).push(res.data);
                (setData as SetData)(data as ToDos[]);

                setStatus('open');
                setStatusIcon(makeMessage('success', res.statusText));
            }).catch((error) => {
                setStatus('open');
                setStatusIcon(makeMessage('fail', error.message));
            })
        } else if (typeform.type === 'Update') {
            await Instance.put(`./${typeform.data?.id}/`, new_data).then(res => {
                (setData as SetData)((data as ToDos[]).map((element) => {
                    if (element.id === typeform.data?.id)
                        element = res.data;
                    return element;
                }));

                setStatus('open');
                setStatusIcon(makeMessage('success', res.statusText));
            }).catch((error) => {
                setStatus('open');
                setStatusIcon(makeMessage('fail', error.message));
            })
        }
    };

    useEffect(() => {
        const initData = {
            title: '',
            description: '',
            complete: false,
            deadline: null
        } as ToDos

        if (typeform.type === 'Update') {
            initData.title = typeform.data?.title as string;
            initData.description = typeform.data?.description as string;
            initData.complete = typeform.data?.complete as boolean;
            initData.deadline = typeform.data?.deadline as string;
        }
        reset(initData);
    }, [typeform, reset])

    return (
        <div className={`new-update ${className}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Title</label>
                <input {...register('title', {
                    required: true,
                    maxLength: 200
                })} />

                <label>Description</label>
                <input {...register("description", { required: true })} />

                <label>Status</label>
                <input type="checkbox" {...register("complete")} />

                <label>Deadline</label>
                <input type="date" {...register("deadline")} />

                <div className="btn-wrapper">
                    <input className="btn submit" type="submit"
                        value={typeform.type} />
                    <div className="btn cancel" onClick={() => {
                        callback('close');
                    }}>
                        Cancel
                    </div>
                </div>

                <div className={`status ${status}`} onClick={() => {
                    setStatus('close');
                    setStatusIcon(null);
                    callback('close');
                }}>
                    {statusIcon}
                </div>
            </form>
        </div>
    )
}

export default AddUpdate;