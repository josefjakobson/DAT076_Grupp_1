
import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardGame from '../components/cardGames';
import TheNavbar from '../components/navbar';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signup';
//import '../styles/style.scss'
import  '../styles/frontpage.scss'
import axios from 'axios';

axios.defaults.withCredentials = true;


export default function LoginView() {
    const [visibility, setVisibility] = useState(true);
    // function switchVisability(setVisible : string) {
    //     if (setVisible == "Login") 
    //     {
    //         visability = true;
    //     }
    //     else if (setVisible == "SignUp") {
    //         visability = false;
    //     }
    //     console.log(visability)
    // }

    return (
    <>
        <div id='frontpage'>
            <Banner/>
            <main id='loginMain'>
                <div>
                {visibility ? (
                        <>
                            <button className='frontpageToggle' onClick={() => setVisibility(true)}>Login</button>
                            <button className='frontpageToggle' id='lighter' onClick={() => setVisibility(false)}>SignUp</button>
                        </>
                    ) : (
                        <>
                        <button className='frontpageToggle' id='lighter' onClick={() => setVisibility(true)}>Login</button>
                        <button className='frontpageToggle'  onClick={() => setVisibility(false)}>SignUp</button>
                    </>
                    )}

                </div>
                {visibility ? (
                        <LoginForm />
                    ) : (
                        <SignupForm />
                    )}
            </main>
        </div>

    </>)

    
  }

