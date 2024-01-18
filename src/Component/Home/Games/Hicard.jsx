import "./Hicard.css";

import React from "react";

function Hicard() {
  return (
    <div className="maincon">
      <div className="main">
        <div className="hello">
          <h4>HIGH LOW VR</h4>
          <button>
            <i class="fa-solid fa-book"></i> Rules
          </button>
        </div>

        <div className="demo">
          <h5>
            <i class="fa-sharp fa-solid fa-desktop"></i> demo123_4316
          </h5>
          <h6>
            Theme<i class="fa-solid fa-circle-half-stroke"></i>
          </h6>
        </div>
      </div>
      <div className="sidecon2">
        <div className="videocon"></div>

        <div className="side">
          <div className="sidecon">
            <h5>AVAILABLE CREDIT</h5>
            <h5> EXPOSURE</h5>
          </div>
          <div className="empty">
            <h4>0</h4>
            <h4>0</h4>
          </div>
        </div>
      </div>
      <div className="Line">
        <h5>2</h5>
        <h5>6</h5>
        <h5>1</h5>
        <h5>2</h5>
        <h5>3</h5>
        <h5>4</h5>
        <h5>6</h5>
        <h5>2</h5>
        <h5>5</h5>
        <h5>2</h5>

        <h6>
          Round Id:
          <br />
          1703485688.4096358
        </h6>

        <h4>PLAYER HISTORY</h4>
      </div>
      <div className="last">
        <div className="last1">
          <div className="clasic">
            {/* <h5>CLASSIC VIEW </h5> */}
            <h6>
              <i class="fa-solid fa-toggle-on"></i>
            </h6>
          </div>
          <div className="win">
            <h4>LAST WIN</h4>
            <h4>TOTAL WIN</h4>
          </div>
          <div className="imgs">
            <button>100</button>
            <button>500</button>
            <button>1k</button>
            <button>5k</button>
            <button>10k</button>
            <button>25k</button>
          </div>
          <div className="undo">
            <div className="un">UNDO</div>
            <div className="rest">RESET</div>
          </div>
        </div>
        <div className="last2">
          <div className="last3">
            <div className="btn">
              <h5>P1</h5>
              <h6>5.88</h6>
            </div>
            <div className="btn1">
              <h5>P2</h5>
              <h6>5.88</h6>
            </div>
            <div className="btn2">
              <h5>P3</h5>
              <h6>5.88</h6>
            </div>
          </div>

          <div className="down">
            <div className="down1">
              <div className="btn4">
                <h5>P2</h5>
                <h6>5.88</h6>
              </div>

              <div className="btn5">
                <h5>P2</h5>
                <h6>5.88</h6>
              </div>

              <div className="btn6">
                <h5>P2</h5>
                <h6>5.88</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hicard;
