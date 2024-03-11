import Banner from '../components/banner';
import Thenavbar from '../components/navbar';
import useModal from '../hooks/useModal';
import Modal from '../components/creditModal';
import Roulette from '../components/roulette/roulette';
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
          <Roulette></Roulette>
        </div>
      </main>
    </>)
  }