
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.scss'
import '../styles/ErrorView.scss'

axios.defaults.withCredentials = true;

export default function ErrorView({ errorMsg = "You are not logged in" }: { errorMsg?: string }) {

    return (
      <>
        <main id='errorView'>
          <h1>Oh no! An error has occurred :(</h1>
          <h3>{errorMsg}</h3>
          <button>Back to Login</button>
        </main>
      </>
    );
  }
  