
import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardGame from '../components/cardGames';
import Navbar from '../components/Navbar';
//import '../styles/style.scss'


export default function HomeView() {
    return (

    <>
      <Navbar />
      <Banner />
      <main>
        <CardGame gameName={"Roulette"} />
        <CardGame gameName={"Dice Game"} />
        <CardGame gameName={"Bingo"} />

      </main>
    </>)
  }