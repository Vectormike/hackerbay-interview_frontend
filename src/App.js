import React, { useState, useEffect } from "react";
import Header from "./components/welcomeHeader";
//import Board from "./components/board.js";
//import Score from "./components/scoreBoard";
import Cell from "./components/cell";
import { shuffleArray } from "./components/shuffleArray";
import { checkFinish } from "./components/checkFinish";
import { scoreCard } from "./components/scoreCard";
import { movement } from "./components/movement";
import createReactClass from "create-react-class";

import "./App.css";

let mario_jump;
let items = [];
let max_mushroom;
let no_of_moves;

let Score = createReactClass({
  getInitialState: function() {
    return {
      score: 0
    };
  },
  render: function() {
    return (
      <div id="score">
        <div>
          <p> Score Achieved </p> <p id="score_achieved"> 0 </p>{" "}
        </div>{" "}
        <div>
          <p> Steps </p> <p id="no_of_moves"> 0 </p>{" "}
        </div>{" "}
        <div>
          <p> Remaining mushrooms </p> <p id="mashrooms_remaining"> 0 </p>{" "}
        </div>{" "}
      </div>
    );
  }
});

let Board = createReactClass({
  getInitialState: function() {
    // build an array to hold all the cells
    //
    let c = [];
    let i;
    for (i = 1; i <= this.props.matrix; i++) {
      c.push(<Cell key={i} id={i} cells={c} />);
      items.push(i);
    }
    return {
      cells: c
    };
  },
  render: function() {
    return <div> {this.state.cells} </div>;
  }
});

function App() {
  let width = prompt("Enter width of square");
  let height = prompt("Enter height of square");
  // This is to ensure the default behavior of the game.
  if (
    height === null ||
    width === null ||
    isNaN(width) === true ||
    isNaN(height) === true
  ) {
    height = 10;
    width = 10;
  }
  let matrixSize = height * width;
  mario_jump = width;

  const [state, setState] = useState({
    matrixSize: matrixSize,
    width: width,
    height: height
  });

  const handleLoad = (width, height) => {
    let matrix = document.getElementById("root");
    matrix.style.height = 40 * height + "px";
    matrix.style.width = 40 * width + "px";
    console.log(items);
    let shuffled_data = shuffleArray(items);
    let truncated_data = shuffled_data.slice(0, Math.max(width, height));
    for (let i = 0; i < truncated_data.length; i++) {
      let elem_position = document.getElementById(truncated_data[i]);
      elem_position.innerHTML =
        "<img src='mario-mashroom.jpeg' alt='mario' class='maze-image'/>";
      elem_position.classList.toggle("active");
    }

    let unique_data = shuffled_data.filter(function(obj) {
      return truncated_data.indexOf(obj) === -1;
    });
    let item = unique_data[Math.floor(Math.random() * unique_data.length)];
    let marioposition = document.getElementById(item);
    marioposition.classList.toggle("mario");
    marioposition.innerHTML =
      "<img src='mario-icon.png' alt='mario' class='maze-image'/>";
    max_mushroom = document.getElementsByClassName("active").length;
    //console.log(max_mushroom);
  };

  const onKeyPress = event => {
    if (
      event.keyCode === 37 ||
      event.keyCode === 38 ||
      event.keyCode === 39 ||
      event.keyCode === 40
    ) {
      if (no_of_moves === undefined) {
        no_of_moves = 0;
      }
      no_of_moves = no_of_moves + 1;
    }
    movement(event, mario_jump, no_of_moves);
    checkFinish(no_of_moves);
    scoreCard(no_of_moves, max_mushroom);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoad(width, height));

    return () => {
      document.addEventListener("keydown", onKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Board matrix={state.matrixSize} items={items} />
      <Score />
    </div>
  );
}

export default App;
