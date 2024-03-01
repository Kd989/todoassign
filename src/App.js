import React, { useState } from 'react';
import './App.css';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark-mode' ? 'light' : 'dark-mode');
  };
  const activeTodosCount = todos.filter(todo => !todo.completed).length
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className='main'>
      <div className="upper-bx-1">
      <div class="overlay"></div>
<div className={`App ${theme}`}>
  <div className='header-flex'>
      <h1 className='h2-top'>Todo App</h1>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark-mode' ? <DarkModeIcon/> : <WbSunnyIcon/>}
      </div>

  </div>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Add new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <div key={index} className={`todolistcontainer todo ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className='spantext'>{todo.text}</span>
            <button onClick={() => deleteTodo(index)} className='btn-close'><CloseIcon/></button>
          </div>
        ))}
      </div>

          <div className='filter-wrapper'>

        <p>items left {activeTodosCount}</p>
      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      
      </div>
        <button onClick={clearCompleted}>Clear Completed</button>
          </div>
    </div>
    </div>

      </div>

      
    
  );
}

export default TodoApp;
