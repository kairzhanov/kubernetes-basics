import React from 'react'
import Todo from './Todo'


export default function TodoList({todos, onDelete, onChangeStyle}) {
    
    return (
        <>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} onDelete={onDelete} onChangeStyle={onChangeStyle} />
            ))}
        </>
    )
}
