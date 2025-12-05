"use client"

import React from "react";


export default function Login() {

const [loading , setLoading] = React.useState(false);
const [error , setError] = React.useState(null);
const [email , setEmail] = React.useState('');
const [password , setPassword] = React.useState('');

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    
 }


    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} />
                <input type="password" placeholder="Password" value={password} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}