
import React, { useEffect, useState } from 'react';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
import Modal from '../components/creditModal';
import '../styles/scoreBoardView.scss'
import { User } from '../components/loginForm';
import axios from 'axios';
import '../styles/scoreBoardView.scss'
//import '../styles/style.scss'


export default function HomeView() {
  const {isOpen, toggle} = useModal();
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    getUser(); // Call the getUser function here
}, []); // Empty dependency array ensures this effect runs only once


  async function getUser() {
    try {
        const response = await axios.get("http://localhost:8080/userRouter/users");
        console.log(response.data);
        var temp : any = [];
        response.data.forEach((user: any) => {
            temp.push({
              username: user.username,
              password: user.password,
              credits: user.credits,
              user_id: user.user_id
            });
        });
        setUsers(temp);
    
      } catch (error) {
        console.log(error)
      } 
}


  return (
    <>
        <div id='ScoreboardView'>
        <Modal isOpen = {isOpen} toggle = {toggle}></Modal>
        <Thenavbar open = {toggle}/>
        <main>
          <h1>Scoreboard</h1>
          <div className='devider'></div>
          {users.slice().sort((a, b) => b.credits - a.credits)  .map((user, index) => (
            <section key={user.user_id}>
              <h5>Nr. {index + 1}</h5>
              <h5>{user.username}</h5>
              <h5>Credits: {user.credits}</h5>
            </section>
  ))}
        </main>
        </div>
    </>)
  }