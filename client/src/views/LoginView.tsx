
import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardGame from '../components/cardGames';
import TheNavbar from '../components/navbar';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signup';
//import '../styles/style.scss'
import  '../styles/frontpage.scss'



export default function LoginView() {
    return (

    <>
        <Banner/>
        <main id='loginMain'>
        <LoginForm />
        <div className='devider'></div>
        <SignupForm/>

        </main>
   
    </>)

    
  }

