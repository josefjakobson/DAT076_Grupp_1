import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
// import '../styles/style.scss'
import '../styles/Profile.scss'


export default function ProfileView() {
  const {isOpen, toggle} = useModal();

  return (
    <>
        <div id='profileView'>
        <Thenavbar open = {toggle}/>
        <h1>Amanda1337</h1>

        <main>
        <section>
                <h2>Profile</h2>
                <form action="">
                    <h5>Change Username</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
                <form action="">
                    <h5>Change Password</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
            </section>

            <section>
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
            </section>

            <section>
                <h2>Friends</h2>
                <form action="">
                    <h5>Add user</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
                <form action="">
                    <h5>Remove</h5>
                    <input type="text" name="" id="" />
                    <button>Change</button>
                </form>
            </section>
        </main>           
        </div>

    </>)
  }