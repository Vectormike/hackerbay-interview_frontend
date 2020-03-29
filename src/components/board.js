import React from "react";
import Cell from "./cell";

const Board = ({ items }) => {
  const initialState = () => {
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
  };
  return <div>{this.cells}</div>;
};

export default Board;
