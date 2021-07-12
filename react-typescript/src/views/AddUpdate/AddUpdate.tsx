import React from "react";
import './AddUpdate.scss'
import { useForm } from "react-hook-form";
import { Instance } from "../../utils/tools";

const status = "Create"

const AddUpdate: React.FC<{ className: string, callback: (action: string) => void }> =
    ({ className, callback }) => {
        const { register, handleSubmit } = useForm();
        const onSubmit = async (data: ToDos) => {
            await Instance.post('.', data).then(res => {
                console.log(res.data);
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
                        <input className="btn submit" type="submit" alt={status} />
                        <div className="btn cancel" onClick={() => {
                            callback('close');
                        }}>
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        )
    }

export default AddUpdate;