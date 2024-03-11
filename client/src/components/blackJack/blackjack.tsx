import React, { useEffect, useState } from 'react';
import '../../styles/blackjackstyle.scss';
import '../../styles/roulettestyle.scss'
import axios from 'axios';

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

interface BlackJackProps {
  user_id: number;
}

function App({ user_id }: BlackJackProps) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [computerHand, setComputerHand] = useState<Card[]>([]);
  const [bet, setBet] = useState<number>(100);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [hasStood, setHasStood] = useState<boolean>(false);

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
    if(deck.length === 0) return; // Ensure deck is not empty
    const newDeck: Card[] = [...deck];
    const newHand: Card[] = [...hand, newDeck.pop()!];
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
    hit(computerHand, setComputerHand);
    setHasStood(true);
    determineWinner();
  };
  
  
  const gameOver = () => {
    return playerValue > 21 || playerHand.length === 5 || computerValue === 21 || hasStood;
  };

  const increaseBet = () => {
    setBet(prevBet => prevBet + 10);
  };

  const decreaseBet = () => {
    if (bet > 10) {
      setBet(prevBet => prevBet - 10);
    }
  };

  const placeBet = async () => {
    if(await checkCredits()) {
      await remove_credits();
      setBetPlaced(true);
      dealCards();
    } else {

    }
  };

  const checkCredits = async () => {
    console.log(user_id);
    try {
      const response = await axios.get<number>("http://localhost:8080/userRouter/credit");
      const credit: number = response.data;
      console.log(credit);
      setBetPlaced(credit >= bet);
      if (credit >= bet) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user credits:", error);
    }
  };
  
  const remove_credits = async () => {
    try {
      await axios.put<boolean>("http://localhost:8080/userRouter/credit", {
        changeAmount: bet
      });
    } catch (error) {
      console.error("Error removing credits:", error);
    }
  }

  const add_credits = async (multiplier: number): Promise<void> => {
    try {
      await axios.put<boolean>("http://localhost:8080/userRouter/credit", {
        id: user_id,
        changeAmount: bet * multiplier
      });
    } catch (error) {
      console.error("Error adding credits:", error);
    }
  };
  

  const reset = () => {
    if (determineWinner() == "Player Wins!") {
      add_credits(2);
    } else if (determineWinner() == "It's a Tie!") {
      add_credits(1);
    }
    setDeck([]);
    setPlayerHand([]);
    setComputerHand([]);
    setBetPlaced(false);
    setGameStarted(false);
    setHasStood(false);
  }

  return (
    <div className="blackjackcontainer">
      <div id='bet'>Bet: {bet} credits</div>
      <div className='rounded-container'>
      {!gameStarted && <div className='changeBet clearfix'>
          <button id='subBet' className='button' onClick={decreaseBet} disabled={betPlaced}>-</button>
          <button id='placeBet' className='button' onClick={placeBet} disabled={betPlaced}>Place Bet</button>
          <button id='addBet' className='button last' onClick={increaseBet} disabled={betPlaced}>+</button>
        </div>}
        {gameStarted && !gameOver() && betPlaced && <div className='clearfix'>
        <button id='playHit' className='button' onClick={() => hit(playerHand, setPlayerHand)} disabled={gameOver() || hasStood}>Hit</button>
        <button id='playStay' className='button last' onClick={playStay} disabled={hasStood}>Stay</button>
        </div>}
        {gameStarted && gameOver() && betPlaced && <div className='clearfix'>
        <button id='reset' className='button' onClick={reset}>Reset/Pay Out</button>
        </div>}
      </div>

      <div className='fullbar clearfix'>
        <div id='reset' className='hide button'>Next Round</div>
        <div id='startover' className='hide button'>Start Over</div>
      </div>

      <div className='title clearfix'>
        <div className='player'>Player:</div>
        <div className='computer'>Computer:</div>
      </div>

      <div id='gameBoard' className='clearfix rounded-container'>
        <div className='player-section card-section'>
        <div className='player-value'>Player Hand Value: {playerValue}</div>
          {playerHand.map((card, index) => (
            <div key={index} className='single-left'>
              <div className='facevalue'>{card.face}</div>
              <div className='facetype'>{card.suit}</div>
            </div>
          ))}
        </div>
        <div className='computer-section card-section'>
        <div className='computer-value'>Computer Hand Value: {computerValue}</div>
          {computerHand.map((card, index) => (
            <div key={index} className='single-left'>
              <div className='facevalue'>{card.face}</div>
              <div className='facetype'>{card.suit}</div>
            </div>
          ))}
        </div>
      </div>
      {gameOver() && <div>{determineWinner()}</div>}
    </div>
  );
}

export default App;
