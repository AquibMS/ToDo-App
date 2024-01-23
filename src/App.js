import React, { useState } from 'react'
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const[todo, setTodo] = useState('');
  const[todos, setTodos] = useState([]);
  const[editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editId){ //check if there is any text inside of editId
      const editTodo = todos.find((i) => i.id === editId); //if there is anything, then find that todo ID so in next step we can edit it
      //now iterate through the array with the ID, and if the editId matches with any ID then return that particular todo, else return normal state of that todo
      const updatedTodos = todos.map((t) => t.id === editTodo.id ? (t = {id: t.id, todo}) : {id: t.id, todo: t.todo });
      setTodos(updatedTodos);
      setEditId(0);
      setTodo('');
      return; // if not mentioned controller will go for next line and will create a new todo
    }
    if(todo !== ''){
      setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos])
      setTodo('');
    }
  }

  const handleDelete =(id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  }

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  }

  return <div className='App'>
    <div className="container">
      <h1>Todo List App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        todo={todo}
        setTodo={setTodo}
        editId={editId}
      />
      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  </div>
}

export default App