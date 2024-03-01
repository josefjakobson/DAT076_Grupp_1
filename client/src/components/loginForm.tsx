import axios from 'axios';
import React, { useRef, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  user_id : number;
  amount : number;
}

export default function LoginForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    LoginUser(username, password)
    console.log('Username:', username);
    console.log('Password:', password);

    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  };

  async function LoginUser(username : string, password : string) {
    setTimeout(async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:8080/userRouter/user");  
        const users = response.data;
        for (let i = 0; i < users.length; i++) {
          if (users[i].user_id == parseInt(username)) {
              console.log("navigate to games")
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            ref={usernameRef} 
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
