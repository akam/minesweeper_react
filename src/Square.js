import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  render() {
    return (
      <div className={this.props.name} onClick={this.props.handleClick}>{this.props.display}</div>
    )
  }
}

export default Square;