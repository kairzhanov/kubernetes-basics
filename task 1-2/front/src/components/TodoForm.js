import React, {useState} from 'react'

function TodoForm({onAdd}) {
    const [title, setInput] = useState('')
    const [styleType, setStyleType] = useState(0)
    
    function onSubmit(e) {
        e.preventDefault();

        if (!title) {
            alert("Please, type title!");
            return;
        }

        onAdd({ title, styleType});

        setInput('');
        setStyleType(0);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Title</span>
                <input type="text" className="form-control" placeholder="Please type here" 
                aria-describedby="basic-addon1"
                id="title" value={title} onChange={(e) => setInput(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                    Special Style
                <input type="checkbox" className="form-check-input ms-2"
                    value={styleType > 0 ? true : false} 
                    checked={styleType > 0 ? true : false}
                    onChange={(e) => setStyleType(e.currentTarget.checked ? 1 : 0)}/>
                </span>
                
            </div>
            <input type="submit" value="Save" className="btn btn-success mt-2" />
        </form>
    )
}

export default TodoForm
