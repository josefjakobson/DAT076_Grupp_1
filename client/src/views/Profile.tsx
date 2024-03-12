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
    const upasswordUpdateRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<User>(); 
    const [logdin, setlogdin] = useState<boolean>(true); 
    const navigate = useNavigate();

    useEffect(() => {
        getUser(); 
    }, []);

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
        const newPassword = upasswordUpdateRef.current?.value || '';
        if (upasswordUpdateRef.current) upasswordUpdateRef.current.value = '';

        const response = await axios.put("http://localhost:8080/userRouter/updatePassword",{
            newPassword: newPassword
          }
        );
        getUser()
    }
 
    async function changeUsername() {
        const newUsername = usernameUpdateRef.current?.value || '';
        if (usernameUpdateRef.current) usernameUpdateRef.current.value = '';
        const response = await axios.put("http://localhost:8080/userRouter/updateUsername",{
            newUsername: newUsername
          }
        );
        if (response.data == true) {
            getUser()
        }
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
        <main>   
        <h1>Account</h1>

            <h2>Information</h2>
            <div className='devider'/>

            <div className='Userinfo'>
                    <h5>ID:</h5>
                    <h5>{user?.user_id}</h5>
                </div>
                <div className='devider'/>
                <div className='Userinfo'>
                    <h5>Username:</h5>
                    <h5>{user?.username}</h5>
                </div>
                <div className='devider'/>
                <div className='Userinfo'>
                    <h5>Password:</h5>
                    <h5>{user?.password}</h5>
                </div>
                <div className='devider'/>
                <div className='Userinfo'>
                    <h5>Credits:</h5>
                    <h5>{user?.credits}</h5>
                </div>
                
                <div className='devider'/>
       

            <h2 id='settingsTitle'>Settings</h2>
            <div id='settings'>
            <div>
                <h5>Change Username</h5>

                <input type="text" placeholder="New username" ref={usernameUpdateRef} />
                <button onClick={changeUsername}>Change Username</button>
            </div>

                    
            <div>
            <h5>Change Password</h5>

                <input type="password" placeholder="New Password" ref={upasswordUpdateRef}/>
                <button onClick={changePassword}>Change Password</button>
            </div>
            </div>
     

                    
            <button onClick={logOut}>Log Out</button>

        </main>

      
 
            
        </div>

    </>)
  }