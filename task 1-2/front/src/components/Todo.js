import React from 'react'
import { FaTimes } from 'react-icons/fa'

function Todo({ todo, onDelete, onChangeStyle }) {
    return (
        <div className={`task d-flex flex-row justify-content-between ${todo.styleType === 1 ? 'type-1' : 'type-0'}`}
            onDoubleClick={() => onChangeStyle(todo.id)}
        >
            <h3>{todo.title} 
            </h3>
            <FaTimes onClick={() => onDelete(todo.id)} 
                    style={{ color: 'red', cursor: 'pointer', fontSize: '2rem'}} />
        </div>
    )
}

export default Todo
