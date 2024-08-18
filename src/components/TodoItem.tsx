import React from 'react';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
    isFromApi: boolean;
}

const ToDoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete, isFromApi }) => {
    return (
        <div className={`todo-item ${completed ? 'todo-item--completed' : ''} ${isFromApi ? 'todo-item--api' : ''}`}>
            <input type="checkbox" checked={completed} onChange={onToggle} />
            <span className='todo-item__text'>{text}</span>
            <button onClick={onDelete} className='todo-item__delete'>Delete</button>
        </div>
    );
};

export default ToDoItem;