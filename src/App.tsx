import React, { useEffect } from 'react';
import TodoList from './components/TodoList';


const App: React.FC = () => {
  useEffect(() => {
    document.title = 'To-Do App';
  }, []);
  return (
    <div className='todo-list'>
      <header className="todo-list__header">
        <h1>My To-Do App</h1>
        <p>Created by Dominik Borović</p>
      </header>
      <TodoList />
    </div>
  );
};

export default App;