import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../components/firebase';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Email/password sign-in successful:", userCredential.user);
            })
            .catch((error) => {
                console.error("Email/password sign-in error:", error);
            });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // successful Google sign-in
                const user = result.user;
                console.log("Google sign-in successful:", user);
            })
            .catch((error) => {
                // errors
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <div className='sign-in-container'> 
            <form onSubmit={signIn}>
                <h1>Log Into Your Account</h1>
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
                <button type="submit">Log In</button>
            </form>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};

export default SignIn;
