import React, { useState, useEffect, useCallback } from 'react';
import './List.scss';
import Bar from '../Bar/Bar';

const List: React.FC<{ data: ToDos[] }> = ({ data }) => {
    const [Data, setData] = useState<ToDos[]>(data);
    const [todos, setTodos] = useState<JSX.Element[] | null>(null);

    const delTodos = useCallback((id: number, action: string) => {
        switch (action) {
            case 'updateStatus':
                setData(Data.map(e => {
                    if (e.id === id) {
                        e.complete = e.complete ? false : true;
                    }
                    return e;
                }));
                break;
            case 'delete':
                setData(Data.filter((e) => e.id !== id));
                break;
            default:
                Error('Unknown action');
        }
    }, [Data])

    useEffect(() => {
        const newTest = Data.map((e) => {
            return <Bar key={e.id} data={e} callback={delTodos} />;
        })

        setTodos(newTest);
    }, [Data, delTodos])

    return (
        <div className="list">
            {todos}
        </div>
    )
}

export default List;