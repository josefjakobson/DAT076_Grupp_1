
import React, { useEffect, useState } from 'react';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
import Modal from '../components/creditModal';
import '../styles/scoreBoardView.scss'
//import '../styles/style.scss'


export default function HomeView() {
  const {isOpen, toggle} = useModal();

  return (
    <>
        <div id='ScoreboardView'>
        <Modal isOpen = {isOpen} toggle = {toggle}></Modal>
        <Thenavbar open = {toggle}/>
        <main>
          <h1>Scoreboard</h1>
          <div className='toggle'>
            <button className='togglebtns'>Everyone</button>
            <button className='togglebtns' id='lighter'>Friends</button>
          </div>
          <section>
            <h2>Username</h2> 
            <h2>Credits</h2> 
            <h5>Games won: </h5> 
            <h5>Games lost:</h5> 
          </section>
        </main>
        </div>
    </>)
  }