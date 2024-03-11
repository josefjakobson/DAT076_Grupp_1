import React, { useState } from 'react';
import '../styles/ErrorView.scss'
import { redirect, useNavigate } from 'react-router-dom';

interface ErrorMessageScreenProps {
  errorMessage: string;
}

const ErrorMessageScreen: React.FC<ErrorMessageScreenProps> = ({ errorMessage }) => {
  const navigate = useNavigate();

  return (
    <div id='errorView'>
        <div className="error-message">
          <h1>{errorMessage}</h1>
          <button onClick={() => { navigate('/') }}>Back to login</button>
        </div>
    </div>
  );
}

export default ErrorMessageScreen;
