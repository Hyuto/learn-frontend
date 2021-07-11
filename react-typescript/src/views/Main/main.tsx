import React, { useState, useEffect } from "react";
import './main.scss'
import List from "../../components/List/List";
import Spinner from "../../components/Spinner/Spinner";
import { Instance } from "../../utils/tools";

const Main: React.FC = () => {
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
        <div className="todos">
            <div className="form">
                <div className="button">
                    Add To Do
                </div>
            </div>
            <div className="list-wrapper">
                <div className={loading}>
                    <Spinner />
                </div>
                {todo}
            </div>
        </div>
    )
}

export default Main;