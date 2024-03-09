
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
        <div id='ScoreboardView'>
            

        </div>
    </>)
  }