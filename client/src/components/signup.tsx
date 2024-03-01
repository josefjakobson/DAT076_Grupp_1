import { Console } from 'console';
import React, { useState } from 'react';

export default function SignupForm() {

    return (
    <div>
      <h2>Sign Up</h2>
      <form >
        <div>
          <input
            type="text"
            placeholder='Username'
            />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'

        
          />
        </div>        
        <div>
          <input
            type="password"
            placeholder='Password'
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

