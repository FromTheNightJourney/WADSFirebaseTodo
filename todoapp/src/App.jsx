import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';
import { auth } from './components/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <SignIn onLogin={handleLogin} />
      <SignUp />
      <AuthDetails onLogout={handleLogout} />

      {/* Conditionally render Todo component if the user is authenticated */}
      {user ? <Todo/>:<p>not authenticated</p>}
    </div>
  );
}

export default App;

