
import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardGame from '../components/cardGames';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
import Modal from '../components/creditModal';
//import '../styles/style.scss'


export default function HomeView() {
  const {isOpen, toggle} = useModal();

  return (
    <>
      <Modal isOpen = {isOpen} toggle = {toggle}></Modal>
      <Thenavbar open = {toggle}/>
      <Banner />
      <main id="frontMain">
        <CardGame gameName={"Roulette"} />
        <CardGame gameName={"Dice Game"} />
        <CardGame gameName={"Bingo"} />
        <CardGame gameName={"BlackJack"} />
      </main>
    </>)
  }