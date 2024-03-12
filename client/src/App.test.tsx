import { render, screen , fireEvent, waitFor} from '@testing-library/react';
import App from './App';
import React from 'react';
import LoginForm from './components/loginForm'; // Import the component to test
import CardGame from './components/cardGames'; // Import the component to test

test('Game should show its name on the screen', async () => {
  render(<CardGame gameName={"A game"}></CardGame>);
  expect(screen.getByText(/A game/)).toBeInTheDocument();
})