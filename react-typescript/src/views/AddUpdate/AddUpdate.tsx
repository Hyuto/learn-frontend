import React from "react";
import './AddUpdate.scss'
import { useForm } from "react-hook-form";
import { Instance } from "../../utils/tools";

const status = "Create"

const AddUpdate: React.FC<{ data: ToDos[] | null, className: string, callback: typeof Callback }> =
    ({ data, className, callback }) => {
        const { register, handleSubmit } = useForm();
        const onSubmit = async (new_data: ToDos) => {
            await Instance.post('.', new_data).then(res => {
                data?.push(res.data);
                console.log(data);
                callback('update-data', data);
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