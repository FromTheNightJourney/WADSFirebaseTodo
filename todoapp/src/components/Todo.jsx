import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import UserInfoPopup from './UserInfoPopup'; 
import { addTodo, updateSearchTerm } from '../redux/actions';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../components/firebase';

const Todo = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = async (text) => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const todoData = {
        userId,
        text,
        completed: false
      };
      try {
        const docRef = await addDoc(collection(db, 'todos'), todoData);
        console.log('Todo added with ID: ', docRef.id);
        // Clear the text bar
        setNewTodoText('');
      } catch (error) {
        console.error('Error adding todo: ', error);
      }
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-woodBrown rounded" style={{ border: '3px solid #deb887' }}>
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>★ The ToDew List ★</h2>
      <div className="text-center mb-4">
        <UserInfoPopup />
      </div>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-deb887 custom-font"
          type="text"
          placeholder="Add New Entry..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo(newTodoText.trim());
            }
          }}
        />
        <button
          className="ml-4 p-2 text-white rounded hover:bg-deb887 focus:outline-none"
          onClick={() => {
            handleAddTodo(newTodoText.trim());
            // Clear the text bar
            setNewTodoText('');
          }}
        >
          <img src="/plus5.jpg" alt="Add" style={{ width: '40px', height: '40px' }}/>
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-deb887 custom-font"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              dispatch(updateSearchTerm(e.target.value));
            }}
          />
          <img src='/serch.png' alt="Search" className="ml-4 w-6 h-6 cursor-pointer" />
        </div>
      </div>
      <TodoList />
    </div>
  );
};

export default Todo;
