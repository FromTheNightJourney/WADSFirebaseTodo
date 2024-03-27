import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { auth, db } from '../components/firebase'; // Assuming db is your Firestore instance

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const currentFilter = useSelector((state) => state.filter); // Get the current filter state from Redux

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const q = query(collection(db, 'todos'), where('userId', '==', userId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const todos = [];
        snapshot.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() });
        });
        setTodos(todos);
      });

      return () => unsubscribe();
    }
  }, []);

  // filter  based on the current state
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'COMPLETED') {
      return todo.completed;
    } else if (currentFilter === 'INCOMPLETE') {
      return !todo.completed;
    } else {
      return true; 
    }
  });

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
        const newTodo = { id: docRef.id, ...todoData };
        setTodos([...todos, newTodo]); 
      } catch (error) {
        console.error('Error adding todo: ', error);
      }
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      await updateDoc(doc(db, 'todos', id), updatedTodo);
    } catch (error) {
      console.error('Error updating todo: ', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  return (
    <ul className="stardew-text">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
