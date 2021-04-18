import React from 'react'

function Button({onAdd, showAdd}) {

    return (
        <button 
            className={`btn ${showAdd ? 'btn-danger' : 'btn-primary'}`}
            onClick={onAdd}    
        >
            {showAdd ? 'Close' : 'Add'}
        </button>
    )
}

export default Button

