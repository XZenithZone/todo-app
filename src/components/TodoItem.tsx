import React from 'react';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

const ToDoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete, }) => {
    return (
        <div className={`todo-item ${completed ? 'todo-item--completed' : ''}`}>
            <input type="checkbox" checked={completed} onChange={onToggle} />
            <span className='todo-item__text'>{text}</span>
            <button onClick={onDelete} className='todo-item__delete'>Delete</button>
        </div>
    );
};

export default ToDoItem;