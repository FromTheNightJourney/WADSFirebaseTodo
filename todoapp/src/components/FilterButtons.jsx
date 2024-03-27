// FilterButtons.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodos, markAllCompleted } from '../redux/actions'; // Import markAllCompleted action

const FilterButtons = () => {
  const dispatch = useDispatch(); 
  const currentFilter = useSelector((state) => state.filter);

  const handleFilter = (filter) => {
    dispatch(filterTodos(filter)); 
  };

  return (
    <div className="flex space-x-4 items-center stardew-text">
      <select
        className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none custom-font"
        value={currentFilter} 
        onChange={(e) => handleFilter(e.target.value)}  
      >
        <option value="ALL">All</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>

      <button
        className="text-sm px-2 py-1 stardew-button rounded ml-2 bg-deb887 text-white"
        onClick={() => dispatch(markAllCompleted())} // Dispatch markAllCompleted action
      >
        Mark all as completed
      </button>
    </div>
  );
};

export default FilterButtons;
