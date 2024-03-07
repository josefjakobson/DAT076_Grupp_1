import React, { useState } from 'react';
import '../../styles/blackjackstyle.scss';
import '../../styles/roulettestyle.scss'

interface Card {
  name: string;
  face: string;
  suit: string;
  value: number;
}

const faces: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits: string[] = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];

function shuffleDeck(): Card[] {
  const deck: Card[] = [];
  for (const face of faces) {
    for (const suit of suits) {
      const value: number = faces.indexOf(face) < 9 ? faces.indexOf(face) + 1 : 10;
      const card: Card = { name: `${face} of ${suit}`, face, suit, value };
      deck.push(card);
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}


function App() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [computerHand, setComputerHand] = useState<Card[]>([]);
  const [bet, setBet] = useState<number>(100);
  const [money, setMoney] = useState<number>(1000);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const dealCards = () => {
    const newDeck: Card[] = shuffleDeck();
    setDeck(newDeck);
    const newPlayerHand: Card[] = [newDeck.pop()!, newDeck.pop()!];
    const newComputerHand: Card[] = [newDeck.pop()!];
    setPlayerHand(newPlayerHand);
    setComputerHand(newComputerHand);
    setGameStarted(true);
  };

  const hit = (hand: Card[], setHand: React.Dispatch<React.SetStateAction<Card[]>>) => {
    const newDeck: Card[] = [...deck];
    const newHand: Card[] = [...hand];
    newHand.push(newDeck.pop()!);
    setDeck(newDeck);
    setHand(newHand);
  };

  const calculateHandValue = (cards: Card[]): number => {
    let value: number = 0;
    let numAces: number = 0;
    for (const card of cards) {
      if (card.face === 'A') {
        numAces++;
      } else {
        value += card.value;
      }
    }
    for (let i = 0; i < numAces; i++) {
      if (value + 11 <= 21 - numAces + 1) {
        value += 11;
      } else {
        value += 1;
      }
    }
    return value;
  };

  const playerValue: number = calculateHandValue(playerHand);
  const computerValue: number = calculateHandValue(computerHand);

  const determineWinner = () => {
    if (playerValue > 21) {
      return 'Computer Wins!';
    } else if (computerValue > 21 || playerValue > computerValue) {
      return 'Player Wins!';
    } else if (playerValue === computerValue) {
      return 'It\'s a Tie!';
    } else {
      return 'Computer Wins!';
    }
  };
  
  const playStay = async () => {
    const stayLoop = () => {
      if (calculateHandValue(computerHand) < 17) {
        hit(computerHand, setComputerHand);
        setTimeout(stayLoop, 500); // Delay only if the condition is met
      } else {
        determineWinner();
      }
    };
  
    stayLoop(); // Start the recursion
  
    // Stop the recursion if the condition is no longer met
    setTimeout(() => {
      determineWinner();
    }, 500 * (5 - computerHand.length));
  };
  
  
  
  

  const gameOver = () => {
    return playerValue > 21 || playerHand.length === 5 || computerValue === 21;
  };

  const increaseBet = () => {
    setBet(prevBet => prevBet + 100);
  };

  const decreaseBet = () => {
    if (bet > 100) {
      setBet(prevBet => prevBet - 100);
    }
  };

  const placeBet = () => {
    setMoney(prevMoney => prevMoney - bet);
    setBetPlaced(true);
    dealCards();
  };

  return (
    <div className="blackjackcontainer">
      <div id='cash'>Cash: ${money}</div>
      <div id='bet'>Bet: ${bet}</div>
      <div className='rounded-container'>
        <div className='changeBet clearfix'>
          <button id='subBet' className='lil button' onClick={decreaseBet} disabled={betPlaced}>-</button>
          <button id='placeBet' className='big button' onClick={placeBet} disabled={betPlaced}>Place Bet</button>
          <button id='addBet' className='lil button last' onClick={increaseBet} disabled={betPlaced}>+</button>
        </div>
      </div>

      {gameStarted && betPlaced && <div className='buttons clearfix'>
        <button id='playHit' className='button' onClick={() => hit(playerHand, setPlayerHand)}>Hit</button>
        <button id='playStay' className='button last' onClick={playStay}>Stay</button>
      </div>}

      <div className='fullbar clearfix'>
        <div id='reset' className='hide button'>Next Round</div>
        <div id='startover' className='hide button'>Start Over</div>
      </div>

      <div className='title clearfix'>
        <div className='player'>Player:</div>
        <div className='computer'>Computer:</div>
      </div>

      <div id='gameBoard' className='clearfix'>
        <div className='player-section card-section'>
          {playerHand.map((card, index) => (
            <div key={index} className='single-left'>
              <div className='facevalue'>{card.face}</div>
              <div className='facetype'>{card.suit}</div>
            </div>
          ))}
          <div className='player-value'>Player Hand Value: {playerValue}</div>
        </div>
        <div className='computer-section card-section'>
          {computerHand.map((card, index) => (
            <div key={index} className='single-left'>
              <div className='facevalue'>{card.face}</div>
              <div className='facetype'>{card.suit}</div>
            </div>
          ))}
          <div className='computer-value'>Computer Hand Value: {computerValue}</div>
        </div>
      </div>
      {gameOver() && <div>{determineWinner()}</div>}
    </div>
  );
}

export default App;
