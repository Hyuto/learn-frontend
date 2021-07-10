import React, { useState, useEffect, useCallback } from 'react';
import './List.scss';
import Bar from '../Bar/Bar';

const List: React.FC<{ data: ToDos[] }> = ({ data }) => {
    const [Data, setData] = useState<ToDos[]>(data);
    const [update, setUpdate] = useState<string[]>(data.map(e => ''));
    const [todos, setTodos] = useState<JSX.Element[] | null>(null);

    const barCalback = useCallback((id: number, action: string) => {
        switch (action) {
            case 'updateStatus':
                setData(Data.map((e) => {
                    if (e.id === id)
                        e.complete = !e.complete;
                    return e;
                }));

                setUpdate(update.map((e, index) => {
                    if (JSON.stringify(data[index]) !==
                        JSON.stringify(Data[index]))
                        e = 'active';
                    return e;
                }));
                break;
            case 'delete':
                setData(Data.filter((e) => e.id !== id));
                break;
            default:
                Error('Unknown action');
        }
    }, [Data, update, data])

    useEffect(() => {
        const newTest = Data.map((e, index) => {
            return <Bar key={e.id} data={e} update={update[index]}
                callback={barCalback} />;
        })

        setTodos(newTest);
    }, [Data, update, barCalback])

    return (
        <div className="list">
            {todos}
        </div>
    )
}

export default List;