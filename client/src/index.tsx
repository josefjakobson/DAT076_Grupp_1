import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RouletteView from './views/RouletteView';
import BlackJackView from './views/BlackJackView';
import ProfileView from './views/Profile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView/>,
  },
  {
    path: "/games",
    element: <HomeView/>,
  },
  {
    path: "/roulette",
    element: <RouletteView/>,
  },
  {
    path: "/BlackJack",
    element: <BlackJackView/>,
  },
  {
    path: "/Profile",
    element: <ProfileView/>,
  },
]);
root.render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
