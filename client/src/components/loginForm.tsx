import axios from 'axios';
import React, { useRef, FormEvent, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import ErrorMessageScreen from '../views/ErrorView';

axios.defaults.withCredentials = true;

export interface User {
  user_id : number;
  username : string;
  password : string;
  credits : number;
}


export default function LoginForm() {
  const [errorSignIn, seterrorSignIn] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState<boolean>(true); 


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';

    LoginUser(username, password)
    return;

  };

  async function LoginUser(inUsername: string, inPassword: string) {
    try {
      console.log(inUsername);
      console.log(inPassword);
  
      const response = await axios.post<User>("http://localhost:8080/userRouter/login", {
        username: inUsername,
        password: inPassword
      });
  
      navigate('/games');
  
    } catch (error : any) {
      console.error(error); // Log the error for debugging purposes
  
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data;
  
        if (status === 401 || status === 403) {
          setErrorMsg(errorMessage);
          seterrorSignIn(true);
        } else {
          setErrorMessage('An error occurred!');
        }
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
    }
    return;
  }

  const handleCloseError = () => {
    setShowError(false); // Close the error screen
  };
  

  return (
    <>
      {false && <ErrorMessageScreen errorMessage={errorMessage} />}
      <div>
      <form onSubmit={handleSubmit}>
      {errorSignIn && <p className='errorMsgLogIn'>{errorMsg}</p>}        
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
    </>
 
  );
}

