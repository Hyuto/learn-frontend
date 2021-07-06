import React, { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import toggle from '../../utils/tools'
import './Bar.scss'

const Bar: React.FC<{ data: ToDos }> = ({ data }) => {
    const [open, setOpen] = useState<string>('hidden');

    return (
        <div className="Bar" onClick={() => setOpen(toggle(open))}>
            <div className="head">
                <div className="text">
                    {data.title}
                </div>
                <div className="icons">
                    {data.complete ? <FaCheck /> : <FaTimes />}
                </div>
            </div>
            <div className={`desc ${open}`}>
                {data.description}
            </div>
        </div>
    )
}

export default Bar;