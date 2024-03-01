import '../styles/CardGame.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../assets/roulett.avif'

export default function CardGame(props: { gameName: string; }) {
    const { gameName } = props;

    return (
      <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{gameName}</Card.Title>
                <Card.Text>
                    Cost per game: 20 Credits
                </Card.Text>
                
                <Button variant="outline-dark">Go to Game</Button>
            </Card.Body>
        </Card>
      </>
    )
  }


  