import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Email/password sign-up successful:", userCredential.user);
            })
            .catch((error) => {
                console.error("Email/password sign-up error:", error);
            });
    };

    return (
        <div className='sign-in-container'> 
            <form onSubmit={signUp}>
                <h1>Register an Account</h1>
                <input 
                    type="email" 
                    placeholder='Enter your Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignUp;
