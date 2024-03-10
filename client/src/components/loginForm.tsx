import axios from 'axios';
import React, { useRef, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

export interface User {
  user_id : number;
  username : string;
  password : string;
  amount : number;
}

export default function LoginForm() {

  const [errorSignIn, seterrorSignIn] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';

    LoginUser(username, password)
  };

  async function LoginUser(inUsername: string, inPassword: string) {
    try {
      // const response = await axios.get<User>("http://localhost:8080/userRouter/user", {
      //   params: {
      //     username: inUsername,
      //     password: inPassword
      //   }
      // });
      const response = await axios.post<User>("http://localhost:8080/userRouter/login", {
        username: inUsername,
        password: inPassword
      });
      const user = response.data;
      console.log(response)
      navigate('/games');      
      seterrorSignIn(true)


    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {errorSignIn && <p className='errorMsgLogIn'>Incorrect username or password.</p>}        
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
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
