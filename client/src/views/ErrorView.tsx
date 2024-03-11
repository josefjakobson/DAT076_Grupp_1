import React, { useState } from 'react';
import '../styles/ErrorView.scss'
import { redirect } from 'react-router-dom';

interface ErrorMessageScreenProps {
  errorMessage: string;
}

const ErrorMessageScreen: React.FC<ErrorMessageScreenProps> = ({ errorMessage }) => {
  return (
    <div id='errorView'>
        <div className="error-message">
          <h1>{errorMessage}</h1>
          <button onClick={() => {}}>Back</button>
        </div>
    </div>
  );
}

export default ErrorMessageScreen;
