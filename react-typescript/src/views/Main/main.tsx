import React, { useContext } from "react";
import './main.scss'
import Bar from "../../components/Bar/Bar";
import Spinner from "../../components/Spinner/Spinner";
import { ContextData } from "../../utils/DataHandler";

const Main: React.FC<{ callback: typeof Callback }> = ({ callback }) => {
    const { data } = useContext(ContextData);
    const loading = data === null ? 'loading' : 'complete';

    const sorting = (a: ToDos, b: ToDos): number => {
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    const todos = data === null ? null : (data as ToDos[]).sort(sorting)
        .map((e) => {
            return <Bar key={e.id} data={e} callback={callback} />;
        })

    console.log('main.tsx');

    return (
        <>
            <div className="btn-wrapper">
                <div className={`add-btn ${loading !== 'complete' ?
                    'nonactive' : ''}`} onClick={() => {
                        if (loading === 'complete')
                            callback('add')
                    }}>
                    Add To Do
                </div>
            </div>
            <div className="list-wrapper">
                <div className={loading}>
                    <Spinner />
                </div>
                <div className='list'>
                    {todos}
                </div>
            </div>
        </>
    )
}

export default Main;