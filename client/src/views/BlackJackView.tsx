import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
import Modal from '../components/creditModal';
import BlackJack from '../components/blackJack/blackjack';
import '../styles/style.scss'


export default function BlackJackView() {
  const {isOpen, toggle} = useModal();

  return (

    <>
      <Modal isOpen = {isOpen} toggle = {toggle}></Modal>
      <Thenavbar open = {toggle}/>
      <Banner />
      <main id="frontMain">
        <div>
          <BlackJack></BlackJack>
        </div>
      </main>
    </>)
  }