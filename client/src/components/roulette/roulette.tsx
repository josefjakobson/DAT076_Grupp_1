import { Component } from 'react';
import '../../styles/roulettestyle.scss';
import axios from "axios";

class Roulette extends Component{
  componentDidMount(): void {
    const $inner: HTMLElement | null = document.querySelector('.inner');
    const $spin: HTMLButtonElement | null = document.getElementById('spin') as HTMLButtonElement;
    const $bet_r: HTMLButtonElement | null = document.getElementById('bet_r') as HTMLButtonElement;
    const $bet_b: HTMLButtonElement | null = document.getElementById('bet_b') as HTMLButtonElement;
    const $bet_g: HTMLButtonElement | null = document.getElementById('bet_g') as HTMLButtonElement;
    const $reset: HTMLButtonElement | null = document.getElementById('reset') as HTMLButtonElement;
    const $data: HTMLElement | null = document.querySelector('.data');
    const $mask: HTMLElement | null = document.querySelector('.mask');
    const maskDefault: string = 'Place Your Bets';
    const timer: number = 9000;
    const $red_bet: HTMLElement | null = document.querySelector('.red_bet');
    const $black_bet: HTMLElement | null = document.querySelector('.black_bet');
    const $green_bet: HTMLElement | null = document.querySelector('.green_bet');
    const infoMessage : HTMLElement | null = document.querySelector('.infoMessage');

    var active_bet_r: number = 0;
    var active_bet_b: number = 0;
    var active_bet_g: number = 0;
  
    const red: number[] = [32,19,21,25,34,27,36,30,23,5,16,1,14,9,18,7,12,3];

    if (infoMessage) {
      infoMessage.textContent = "It's gaming time 😎"
    }

    if ($red_bet) {
      $red_bet.textContent = "0";
    }
    if ($black_bet) {
      $black_bet.textContent = "0";
    }
    if ($green_bet) {
      $green_bet.textContent = "0";
    }
  
    if ($reset) {
      $reset.style.display = 'none';
    }
  
    if ($mask) {
      $mask.textContent = maskDefault;
    }
  
    if ($spin) {
      $spin.addEventListener('click', () => {
        const randomNumber: number = Math.floor(Math.random() * 36);
        let color: string | null = null;
        if ($inner) {
          $inner.setAttribute('data-spinto', randomNumber.toString());
        }
        const selectedInput: HTMLInputElement | null = document.querySelector(`li:nth-child(${randomNumber}) input`);
        if (selectedInput) {
          selectedInput.checked = true;
        } else {
          console.error("Could not find input element for number: " + randomNumber);
        }
  
        if ($spin) {
          $spin.style.display = 'none';
          $bet_r.disabled = true;
          $bet_b.disabled = true;
          $bet_g.disabled = true;
        }
        if ($reset) {
          $reset.classList.add('disabled');
          $reset.disabled = true;
          $reset.style.display = 'block';
        }
  
        const placeholderElement: HTMLElement | null = document.querySelector('.placeholder');
        if (placeholderElement) {
          placeholderElement.remove();
        } else {
          console.error("Could not find element with class 'placeholder'");
        }
  
        setTimeout(() => {
          if ($mask) {
            $mask.textContent = 'Spinning...';
          }
        }, timer/2);
  
        setTimeout(() => {
          if ($mask) {
            $mask.textContent = maskDefault;
          }
        }, timer+500);
  
        setTimeout(() => {
          if ($reset) {
            $reset.classList.remove('disabled');
            $reset.disabled = false;
          }
  
          if(red.includes(randomNumber)) {
            color = 'red';
          } else if (randomNumber === 0){
            color = 'green';
          } else {
            color = 'black';
          }
  
          const resultNumber: HTMLElement | null = document.querySelector('.result-number');
          const resultColor: HTMLElement | null = document.querySelector('.result-color');
          const result: HTMLElement | null = document.querySelector('.result');
          if (resultNumber) {
            resultNumber.textContent = randomNumber.toString();
          }
          if (resultColor) {
            resultColor.textContent = color;
          }
          if (result) {
            result.style.backgroundColor = color || '';
          }
          if ($data) {
            $data.classList.add('reveal');
          }
          if ($inner) {
            $inner.classList.add('rest');
          }
          if (active_bet_r && color === 'red') {
            this.add_credits(active_bet_r, 2);
            if (infoMessage) {
              var temp: number = active_bet_r * 2;
              infoMessage.textContent = temp.toString();
            }
          } else if (active_bet_b && color === 'black') {
            this.add_credits(active_bet_b, 2);
            if (infoMessage) {
              var temp: number = active_bet_b * 2;
              infoMessage.textContent = temp.toString();
            }
          } else if (active_bet_g && color === 'green') {
            this.add_credits(active_bet_g, 35)
            if (infoMessage) {
              var temp: number = active_bet_g * 35;
              infoMessage.textContent = temp.toString();
            }
          }
          active_bet_r = 0;
          active_bet_b = 0;
          active_bet_g = 0;
        }, timer);
      });
    }
  
    if ($reset) {
      $reset.addEventListener('click', () => {
        if ($inner) {
          $inner.setAttribute('data-spinto', '');
        }
        if ($inner) {
          $inner.classList.remove('rest');
        }
        if ($reset) {
          $reset.style.display = 'none';
        }
        if ($spin) {
          $spin.style.display = 'block';
        }
        if ($data) {
          $data.classList.remove('reveal');
        }
        $bet_r.disabled = false;
        $bet_b.disabled = false;
        $bet_g.disabled = false;

        if ($red_bet) {
          $red_bet.textContent = "0";
        }
        if ($black_bet) {
          $black_bet.textContent = "0";
        }
        if ($green_bet) {
          $green_bet.textContent = "0";
        }

        active_bet_b = 0;
        active_bet_r = 0;
        active_bet_g =  0;
        
      });
    }

    if ($bet_r) {
      $bet_r.addEventListener('click', async () => {
        if ($red_bet) {
          if (await this.check_credits()) {
            await this.remove_credits();
            active_bet_r = active_bet_r + 20;
            $red_bet.textContent = active_bet_r.toString();
            if (infoMessage) {
              infoMessage.textContent = "Bet placed."
            }
          } else {
            if (infoMessage) {
              infoMessage.textContent = "You do not have enough credits."
            }
          }
        }
      })
    }
    if ($bet_b) {
      $bet_b.addEventListener('click', async () => {
        if ($black_bet) {
          if (await this.check_credits()) {
            await this.remove_credits();
            active_bet_b = active_bet_b + 20;
            $black_bet.textContent = active_bet_b.toString();
            if (infoMessage) {
              infoMessage.textContent = "Bet placed."
            }
          } else {
            if (infoMessage) {
              infoMessage.textContent = "You do not have enough credits."
            }
          }
        }
      })
    }
    if ($bet_g) {
      $bet_g.addEventListener('click', async () => {
        if ($green_bet) {
          if (await this.check_credits()) {
            await this.remove_credits();
            active_bet_g = active_bet_g + 20;
            $green_bet.textContent = active_bet_g.toString();
            if (infoMessage) {
              infoMessage.textContent = "Bet placed."
            }
          } else {
            if (infoMessage) {
              infoMessage.textContent = "You do not have enough credits."
            }
          }
        }
      })
    }
  }
  
  async check_credits(): Promise<boolean> {
    try {
      const response = await axios.get<number>("http://localhost:8080/userRouter/credit")
      const credit: number = response.data;
      console.log(credit);
      return credit >= 20;
    } catch (error) {
      console.error("Error fetching user credits:", error);
      return false;
    }
  }

  async remove_credits() {
    try {
      await axios.put<boolean>("http://localhost:8080/userRouter/credit", {
        changeAmount: -20
      });
    } catch (error) {
      console.error("Error removing credits:", error);
    }
  }

  async add_credits(number: number, multiplier: number) {
    try {
      await axios.put<boolean>("http://localhost:8080/userRouter/credit", {
        changeAmount: (number * multiplier)
      });
    } catch (error) {
      console.error("Error adding credits:", error);
    }
  }
  
  
  render() {
    return (
      <body className="rouletteContainer">
        <meta charSet="UTF-8" />
        <title>CodePen - CSS Roulette Wheel</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" /><link rel="stylesheet" href="./style.css" />
        <div className="main">
          <center>
            <button type="button" className="btn" id="spin"><span className="btn-label">Spin</span></button> 
            <button type="button" className="btn btn-reset" id="reset"><span className="btn-label">New Game</span></button>
          </center>
          <div className="plate" id="plate">
            <ul className="inner">
              <li className="number"><label><input type="radio" name="pit" value="32" /><span className="pit">32</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="15" /><span className="pit">15</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="19" /><span className="pit">19</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="4" /><span className="pit">4</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="21" /><span className="pit">21</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="2" /><span className="pit">2</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="25" /><span className="pit">25</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="17" /><span className="pit">17</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="34" /><span className="pit">34</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="6" /><span className="pit">6</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="27" /><span className="pit">27</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="13" /><span className="pit">13</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="36" /><span className="pit">36</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="11" /><span className="pit">11</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="30" /><span className="pit">30</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="8" /><span className="pit">8</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="23" /><span className="pit">23</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="10" /><span className="pit">10</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="5" /><span className="pit">5</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="24" /><span className="pit">24</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="16" /><span className="pit">16</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="33" /><span className="pit">33</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="1" /><span className="pit">1</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="20" /><span className="pit">20</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="14" /><span className="pit">14</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="31" /><span className="pit">31</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="9" /><span className="pit">9</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="22" /><span className="pit">22</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="18" /><span className="pit">18</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="29" /><span className="pit">29</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="7" /><span className="pit">7</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="28" /><span className="pit">28</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="12" /><span className="pit">12</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="35" /><span className="pit">35</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="3" /><span className="pit">3</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="26" /><span className="pit">26</span></label></li>
              <li className="number"><label><input type="radio" name="pit" value="0" /><span className="pit">0</span></label></li>
            </ul>
            <div className="data">
              <div className="data-inner">
                <div className="mask"/>
                <div className="result">
                  <div className="result-number">00</div>
                  <div className="result-color">red</div>        
                </div>
              </div>
            </div>
          </div>
          <div className="bet-buttons-container">
            <button type="button" className="btn" id="bet_r"><center><span className="btn-label">Bet 20 credits on red</span></center></button>
            <button type="button" className="btn" id="bet_b"><center><span className="btn-label">Bet 20 credits on black</span></center></button>
            <button type="button" className="btn" id="bet_g"><center><span className="btn-label">Bet 20 credits on green</span></center></button>
          </div>
          <div className="rounded-container">
            <center>
              <div className="infoMessage"></div>
            </center>
          </div>
          <div className="rounded-container">
          <div className="color-container red-container"><center><div className="red_bet"></div></center></div>
            <div className="color-container black-container"><center><div className="black_bet"></div></center></div>
            <div className="color-container green-container"><center><div className="green_bet"></div></center></div>
          </div>
        </div>
      </body>
    );
  }
}

export default Roulette;
