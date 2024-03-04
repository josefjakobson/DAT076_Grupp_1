
import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardGame from '../components/cardGames';
import Navbar from '../components/Navbar';
import Roulette from '../assets/roulette/dist/roulette';
//import '../styles/style.scss'


export default function HomeView() {
    return (

    <>
      <Navbar />
      <Banner />
      <main id="frontMain">
        <CardGame gameName={"Roulette"} />
        <CardGame gameName={"Dice Game"} />
        <CardGame gameName={"Bingo"} />
        <Roulette user_id={1} />
      </main>
    </>)
  }