import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import Button from './components/Button';
import { useState, useEffect } from 'react'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
// Damir Kairzhanov 20MD0173

const host = "http://localhost";
const port = "61328"; // port change here

function App() {
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodo(todosFromServer);
    }
    getTodos();
    
  }, [])

  const fetchTodos = async () => {
    const res = await fetch(`${host}:${port}/tasks`);
    const data = await res.json();
    console.log(data)
    return data;
  }

  // Fetch Task
  const fetchTodo = async (id) => {
    const res = await fetch(`${host}:${port}/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const [showAddTodo, setShowAddTodo] = useState(false);

  const AddTodo = async (todo) =>  {

    const res = await fetch(`${host}:${port}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    const data = await res.json();

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTodo = {id, ...todo}
    setTodo([...todos, data]);
    // console.log(todos);
  }

  const deleteTodo = async (id) =>  {
    // console.log("delete", id);
    const res = await fetch(`${host}:${port}/tasks/${id}`, {
      method: 'DELETE',
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTodo(todos.filter((todo) => todo.id !== id))
      : alert('Error Deleting This Todo')

    // setTodo(todos.filter((todo) => todo.id !== id));
  }

  const changeStyle = async (id) =>  {
    // console.log(id);
    // setTodo(todos.map((todo) => todo.id === id ? { ...todo, styleType: 1 - todo.styleType } : todo));

    const todo = await fetchTodo(id)
    const updTask = { ...todo, styleType: 1 - todo.styleType }

    const res = await fetch(`${host}:${port}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTodo(
      todos.map((todo) =>
        todo.id === id ? { ...todo, styleType: 1 - data.styleType } : todo
      )
    )
  }
  
  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-6">
          {/* <div>
            <input type="text" className="form-control" placeholder="Please type here the port of the backend" 
                id="port" value={port} onChange={(e) => setPort(e.target.value)}/>
          </div> */}
          <div className="card p-4">
            <div className="card-hearder d-flex flex-row justify-content-between">
              
              <h1 className="title">Todo App ({ (todos.length > 0) ? (todos.length + ' left') : 'nothing'})</h1>
              <Button onAdd={() => setShowAddTodo(!showAddTodo)} showAdd={showAddTodo}/>
            </div>
            <div className="card-body">
              {showAddTodo && <TodoForm onAdd={AddTodo} />}
              <br/>
              <br/>
              <TodoList todos={todos} onDelete={deleteTodo} onChangeStyle={changeStyle}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
