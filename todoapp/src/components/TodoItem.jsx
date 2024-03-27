import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const TodoItem = ({ todo, index, onUpdate, onDelete }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    onUpdate(todo.id, updatedTodo);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4 stardew-text">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        <span className={`mr-4 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
      </div>
      <div className='space-x-3 ml-8'>
        <button className="mr-2 text-sm stardew-button sm:px-2 px-1 py-1 rounded" onClick={handleToggleComplete} >
          {todo.completed ? <FaTimes /> : <FaCheck />}
        </button>
        <button className="mr-2 text-sm stardew-button sm:px-2 px-1 py-1 rounded" onClick={handleDelete} >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
