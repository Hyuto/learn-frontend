import React, { useCallback } from 'react';
import './List.scss';
import Bar from '../Bar/Bar';

const List: React.FC<{ data: ToDos[], callback: typeof Callback }> =
    ({ data, callback }) => {
        const barCalback = useCallback((id: number, action: string) => {
            switch (action) {
                case 'delete':
                    const postDelete = data.filter((e) => e.id !== id);
                    callback('update-data', postDelete);
                    break;
                case 'update':
                    const postUpdate = data.map((e) => {
                        if (e.id === id)
                            e.complete = !e.complete;
                        return e;
                    });
                    callback('update-data', postUpdate);
                    break;
                default:
                    Error('Unknown action');
            }
        }, [data, callback])

        return (
            <div className="list">
                {
                    data.map((e) => {
                        return <Bar key={e.id} data={e} callback={barCalback} />;
                    })
                }
            </div>
        )
    }

export default React.memo(List);