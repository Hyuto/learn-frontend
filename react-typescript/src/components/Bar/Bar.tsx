import React from 'react'
import './Bar.scss'

const Bar: React.FC<{ data: ToDos }> = ({ data }) => {
    return (
        <div className="Bar">
            {data.title}
        </div>
    )
}

export default Bar;