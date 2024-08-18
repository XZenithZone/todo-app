import React, { useState } from 'react';
import ToDoItem from './TodoItem';

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
    isFromApi: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([
    ]);
    const [apiCount, setApiCount] = useState<number>(1);

const completedTasks = todos.filter(todo => todo.completed).length;


const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false, isFromApi: false };
    setTodos([...todos, newTodo]);
    };

const toggleTodo = (id:number) => {
    setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    };

const deleteAllTodos = () => {
    setTodos([]);
    };

const deleteManualTodos = () => {
    setTodos(todos.filter(todo => todo.isFromApi));
    };

const deleteApiTodos = () => {
    setTodos(todos.filter(todo => !todo.isFromApi));
    };

const fetchUniqueTodos = async (count: number, retries: number = 10): Promise<ToDo[]> => {
    try {
        const response = await fetch(`https://dummyjson.com/todos?limit=${retries}`);
        const data = await response.json();
    
        const newTodos: ToDo[] = data.todos
            .map((todo: { id: number; todo: string; completed: boolean }): ToDo => ({
                id: todo.id * Date.now(),
                text: todo.todo,
                completed: todo.completed,
                isFromApi: true,
            }))
            .filter((newTodo: ToDo) => !todos.some(existingTodo => existingTodo.text === newTodo.text));
    
        if (newTodos.length < count && retries > 0) {
            const additionalTodos = await fetchUniqueTodos(count - newTodos.length, retries - 1);
            return [...newTodos, ...additionalTodos];
        }
    
        return newTodos.slice(0, count);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        alert('An error occurred while fetching tasks.');
        return [];
    }
};
    
    const fetchTodos = async (count: number) => {
        const uniqueTodos = await fetchUniqueTodos(count);
    
        if (uniqueTodos.length > 0) {
            setTodos([...todos, ...uniqueTodos]);
            alert(`${uniqueTodos.length} tasks added successfully!`);
        } else {
            alert('No new tasks were added.');
        }
    };

return (
    <div className="todo-list">
        {todos.map(todo => (
        <ToDoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            isFromApi={todo.isFromApi}
        />
        ))}

        <div className="todo-list__label">
            Completed Tasks: {completedTasks}
        </div>

        <input
            type="text"
            className="todo-list__input"
            placeholder="Add a new task"
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    if (e.currentTarget.value.trim()) {
                      addTodo(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                } else {
                alert('Please enter a valid task.');
            }   
        }}}
        />
      
        <div className="api-integration">
            <input
                type="number"
                className="api-integration__input"
                value={apiCount}
                onChange={(e) => setApiCount(Number(e.currentTarget.value))}
                min="1"
                placeholder="Number of tasks to fetch"
            />
            <button
                className="api-integration__button"
                onClick={() => fetchTodos(apiCount)}
            >
                Fetch Tasks from API
            </button>
        </div>
      
          <div className="delete-buttons">
            <button className="delete-buttons__button" onClick={deleteAllTodos}>
              Delete All Tasks
            </button>
            <button className="delete-buttons__button" onClick={deleteManualTodos}>
              Delete Manual Tasks
            </button>
            <button className="delete-buttons__button" onClick={deleteApiTodos}>
              Delete API Tasks
            </button>
          </div>
        </div>
    );
};
      

export default TodoList;