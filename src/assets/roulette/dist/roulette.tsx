import React from "react";
import "./style.css"

class Roulette extends React.Component {
  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <title>CodePen - CSS Roulette Wheel</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" /><link rel="stylesheet" href="./style.css" />
        {/* partial:index.partial.html */}
        <div className="main">
          <button type="button" className="btn" id="spin"><span className="btn-label">Spin</span></button>
          <button type="button" className="btn btn-reset" id="reset"><span className="btn-label">New Game</span></button> 
          <div className="plate" id="plate">
            <ul className="inner">
              <li className="number"><label><input type="radio" name="pit" defaultValue={32} /><span className="pit">32</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={15} /><span className="pit">15</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={19} /><span className="pit">19</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={4} /><span className="pit">4</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={21} /><span className="pit">21</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={2} /><span className="pit">2</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={25} /><span className="pit">25</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={17} /><span className="pit">17</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={34} /><span className="pit">34</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={6} /><span className="pit">6</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={27} /><span className="pit">27</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={13} /><span className="pit">13</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={36} /><span className="pit">36</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={11} /><span className="pit">11</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={30} /><span className="pit">30</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={8} /><span className="pit">8</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={23} /><span className="pit">23</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={10} /><span className="pit">10</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={5} /><span className="pit">5</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={24} /><span className="pit">24</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={16} /><span className="pit">16</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={33} /><span className="pit">33</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={1} /><span className="pit">1</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={20} /><span className="pit">20</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={14} /><span className="pit">14</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={31} /><span className="pit">31</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={9} /><span className="pit">9</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={22} /><span className="pit">22</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={18} /><span className="pit">18</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={29} /><span className="pit">29</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={7} /><span className="pit">7</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={28} /><span className="pit">28</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={12} /><span className="pit">12</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={35} /><span className="pit">35</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={3} /><span className="pit">3</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={26} /><span className="pit">26</span></label></li>
              <li className="number"><label><input type="radio" name="pit" defaultValue={0} /><span className="pit">0</span></label></li>
            </ul>
            <div className="data">
              <div className="data-inner">
                <div className="mask" />
                <div className="result">
                  <div className="result-number">00</div>
                  <div className="result-color">red</div>        
                </div>
              </div>
            </div>
          </div>
          <div className="previous-results">
            <ol className="previous-list">
              <li className="visuallyhidden placeholder">No results yet.</li>
            </ol>
          </div>
        </div>
        {/* partial */}
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js'></script><script  src="./script.js"></script>
      </div>
    );
  }
}

export default Roulette;
