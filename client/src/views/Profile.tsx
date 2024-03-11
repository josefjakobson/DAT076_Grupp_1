import axios from 'axios';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
// import '../styles/style.scss'
import '../styles/Profile.scss'
import { useEffect, useRef, useState } from 'react';
import { User } from '../components/loginForm';
import ErrorMessageScreen from './ErrorView';
import { useNavigate } from 'react-router-dom';








export default function ProfileView() {
    const {isOpen, toggle} = useModal();
    const usernameUpdateRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState<User>(); 
    const [logdin, setlogdin] = useState<boolean>(true); 
    const navigate = useNavigate();

    useEffect(() => {
        getUser(); // Call the getUser function here
    }, []); // Empty dependency array ensures this effect runs only once

 
    async function getUser() {
        try {
            const response = await axios.get("http://localhost:8080/userRouter/currentUser");
            console.log(response.data);
            if (response.data == undefined) {
                setlogdin(false);
            }
            await setUser( {
                username: response.data.username,
                password: response.data.password,
                credits: response.data.credits,
                user_id: response.data.user_id
                });
          } catch (error) {
            console.log(error)
            setlogdin(false);
          } 
    }

    async function changePassword() {
        const newPassword = usernameUpdateRef.current?.value || '';
        const response = await axios.put("http://localhost:8080/userRouter/updatePassword",{
            newPassword: newPassword
          }
        );
        console.log("change password")
    }
 
    async function changeUsername() {
        const newUsername = usernameUpdateRef.current?.value || '';
        const response = await axios.put("http://localhost:8080/userRouter/updateUsername",{
            newUsername: newUsername
          }
        );
        if (response.data == true) {
            getUser()
        }
    }

    async function deleteUser() {
        console.log("delete user")
    }

    async function logOut() {
        const response = await axios.put("http://localhost:8080/userRouter/logout");
        navigate('/')
    }
    

  return (
    <>
        {!logdin && <ErrorMessageScreen errorMessage={"Not logged in"}/>}
        
        <div id='profileView'>
        <Thenavbar open = {toggle}/>
        <h1>{user?.username}</h1>
        {/* <div className='toggle'>
            <button className='togglebtns'>Overview</button>
            <button className='togglebtns' id='lighter'>Settings</button>
          </div> */}
        <main>
      
        <section>
                <h2>Profile</h2>
                    <h5>Change Username</h5>
                    <input
                        type="text"
                        placeholder="New username"
                        ref={usernameUpdateRef} 
                    />
                    <button onClick={changeUsername}>Change</button>
                    <h5>Change Password</h5>
                    <input type="text" name="" id="" />
                    <button onClick={changePassword}>Change</button>
                    <button onClick={logOut}>Log Out</button>
                {/* <form>
                    <h5>Delete Account</h5>
                    <button onClick={deleteUser}>Delete</button>
                </form> */}
            </section>

            {/* <section>
                <h2>Credits</h2>
                <form action="">
                    <h5>Take Out Credits</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
                <form action="">
                    <h5>Send Credits</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
                <form action="">
                    <h5>Add Credits</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
            </section>

            <section> */}
                {/* <h2>Friends</h2>
                <form action="">
                    <h5>Add user</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
                <form action="">
                    <h5>Remove follower</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form> */}
            {/* </section> */}
        </main>           
        </div>

    </>)
  }