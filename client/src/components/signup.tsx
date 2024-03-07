
import axios from 'axios';
import React, { useRef, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface User {
  user_id: number;
  amount: number;
}

export default function SignupForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value || '';
    const password1 = passwordRef1.current?.value || '';
    const password2 = passwordRef2.current?.value || '';
    console.log('Username:', username);
    console.log('Password:', password1);

    if (usernameRef.current) usernameRef.current.value = '';
    if (passwordRef1.current) passwordRef1.current.value = '';
    if (passwordRef2.current) passwordRef2.current.value = '';

    if (password2 == password1) {
      SignUpUser(5, password1)
    }
    else {
      alert('Password does not match');
    }

    // add to see if a username is in use
   
  };

  async function SignUpUser(username: number, password: string) {
    try {
        const response = await axios.post<User>("http://localhost:8080/userRouter/user", {
            id: username
        });
      
        const users = response.data;
        console.log(users);
    } catch (error: any) {
        console.log(error);
    }
}

    return (
    <div>
      <h2>Sign Up</h2>
      <form  >
        <div>
          <input
            type="text"
            placeholder='Username'
            ref={usernameRef} 
            />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'
            ref={passwordRef1} 

        
          />
        </div>        
        <div>
          <input
            type="password"
            placeholder='Password'
            ref={passwordRef2} 

          />
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

