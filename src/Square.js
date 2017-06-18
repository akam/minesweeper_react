import React, { Component } from 'react';
import './Square.css';

class Square extends Component {

  shouldComponentUpdate(nextProps){
    if(this.props.name === nextProps.name){
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className={this.props.name} onClick={this.props.handleClick}>{this.props.display}</div>
    )
  }
}

export default Square;