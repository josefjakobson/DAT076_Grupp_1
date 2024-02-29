import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Banner from './components/banner';
import Thenavbar from './components/navbar';
import roulette from './assets/roulette/dist/roulette';
import CardGame from './components/cardGames';
import './styles/style.scss'
import HomeView from './views/HomeView';
import Roulette from './assets/roulette/dist/roulette';
// Define the User interface
export interface User {
  user_id: number;
  amount: number;
}

function App() {
  const [userCredit, setUserCredit] = useState<number | undefined>(undefined);

  function UserMoney({ credit }: { credit: number | undefined }) {
    if (credit === undefined) {
      return <div>Loading...</div>; // Handle case where user info is not available yet
    }
    return (
      <div>
        <h4>User: 1</h4>
        <h4>Money: {credit}</h4>
      </div>
    );
  }

  async function updateCredit() {
    setTimeout(async () => {
      try {
        const response = await axios.get<number>("http://localhost:8080/userRouter/credit", {
          params: {
            id: 1
          }
        });        
        console.log(response.data);
        const userData: number = response.data;
        setUserCredit(userData); // Update userInfo state with received data

      } catch (error: any) {
        console.log(error);
      }
    });
  }

  useEffect(() => {
    updateCredit();
  }, []);

  return (
    <div className="App">
      <Thenavbar></Thenavbar>
      <HomeView/>
      <Roulette></Roulette>
      <UserMoney credit={userCredit} />
    </div>
  );
}

export default App;
