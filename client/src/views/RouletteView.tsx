import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardGame from '../components/cardGames';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
import Modal from '../components/creditModal';
import Roulette from '../assets/roulette/dist/roulette';
import '../styles/style.scss'


export default function RouletteView() {
  const {isOpen, toggle} = useModal();

  return (

    <>
      <Modal isOpen = {isOpen} toggle = {toggle}></Modal>
      <Thenavbar open = {toggle}/>
      <Banner />
      <main id="frontMain">
        <div>
          <Roulette user_id={1}/>
        </div>
      </main>
    </>)
  }