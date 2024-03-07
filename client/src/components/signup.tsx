
import axios from 'axios';
import React, { useRef, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface User {
  user_id: number;
  amount: number;
}

export default function SignupForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);

  const [usernameError, setUsernameError] = useState(false);
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

  const [usernameNotUniqe, setUsernameNotUniqe] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUsernameNotUniqe(false);
    setPasswordsMatch(true);

    const username = usernameRef.current?.value || '';
    const password1 = passwordRef1.current?.value || '';
    const password2 = passwordRef2.current?.value || '';
    console.log('Username:', username);
    console.log('Password:', password1);

    setUsernameError(username === '');
    setPassword1Error(password1 === '');
    setPassword2Error(password2 === '');

    if (username === '' || password1 === '' || password2 === '') {
      return;
    }

    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef1.current) passwordRef1.current.value = '';
    if (passwordRef2.current) passwordRef2.current.value = '';

    if (password2 == password1) {
      SignUpUser(5, password1)
    }
    else {
      setPasswordsMatch(false)
    }

    // add to see if a username is in use
   
  };

  async function SignUpUser(username: number, password: string) {
    try {
        const response = await axios.post<User>("http://localhost:8080/userRouter/user", {
            id: username
        });
        const users = response.data;
        console.log(response.data)
        if (response.data.user_id == undefined)
        {
          setUsernameNotUniqe(true);
        }
    } catch (error: any) {
        console.log(error);
    }
}

    return (
    <div>
      <form>
      {passwordsMatch == false && <p className='errorMsgLogIn'>The passwords do not match.</p>}
      {usernameNotUniqe && <p className='errorMsgLogIn'>The username is already in use.</p>}
        <div>
          <input
            type="text"
            placeholder='Username'
            ref={usernameRef} 
            className={usernameError ? 'emptyField' : ''}
            />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'
            ref={passwordRef1} 
            className={password1Error ? 'emptyField' : ''}        
          />
        </div>        
        <div>
          <input
            type="password"
            placeholder='Password'
            ref={passwordRef2} 
            className={password2Error ? 'emptyField' : ''}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

