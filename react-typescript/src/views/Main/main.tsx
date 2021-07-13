import React, { useState, useEffect } from "react";
import './main.scss'
import List from "../../components/List/List";
import Spinner from "../../components/Spinner/Spinner";

const Main: React.FC<{ data: ToDos[] | null, callback: typeof Callback }> =
    ({ data, callback }) => {
        const [todos, setTodos] = useState<JSX.Element | null>(null);
        const [loading, setLoading] = useState<string>('loading');

        useEffect(() => {
            console.log("Main.tsx");
            if (data !== null) {
                setTodos(<List data={data} callback={callback} />);
                setLoading('complete');
            }
        }, [data, callback]);

        return (
            <>
                <div className="btn-wrapper">
                    <div className={`add-btn ${loading !== 'complete' ?
                        'nonactive' : ''}`} onClick={() => {
                            if (loading === 'complete')
                                callback('open')
                        }}>
                        Add To Do
                    </div>
                </div>
                <div className="list-wrapper">
                    <div className={loading}>
                        <Spinner />
                    </div>
                    {todos}
                </div>
            </>
        )
    }

export default Main;