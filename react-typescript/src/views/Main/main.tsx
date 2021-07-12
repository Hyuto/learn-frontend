import React, { useState, useEffect } from "react";
import './main.scss'
import List from "../../components/List/List";
import Spinner from "../../components/Spinner/Spinner";
import { Instance } from "../../utils/tools";

const Main: React.FC<{ callback: (action: string) => void }> = ({ callback }) => {
    const [todo, setTodo] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState<string>('loading');

    useEffect(() => {
        Instance.get(".").then((response) => {
            const data: JSX.Element = <List data={response.data} />;

            setTodo(data);
            setLoading('complete');
        });
    }, []);

    return (
        <>
            <div className="btn-wrapper">
                <div className="add-btn" onClick={() => callback('open')}>
                    Add To Do
                </div>
            </div>
            <div className="list-wrapper">
                <div className={loading}>
                    <Spinner />
                </div>
                {todo}
            </div>
        </>
    )
}

export default Main;