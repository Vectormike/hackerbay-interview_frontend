import React, { Component } from "react";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    return (
      <div
        className={this.state.selected ? "cell active" : "cell"}
        id={this.props.id}
      ></div>
    );
  }
}
