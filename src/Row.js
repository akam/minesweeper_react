import React, { Component } from 'react';
import './Row.css';
import Square from './Square'

class Row extends Component {
  render() {
    let squares = this.props.squares.map((val,i)=> {
      if(val.visited){
        if(val.safe){
          return <Square safe={val.safe} key={val.id} handleClick={() => this.props.handleClick(i)} display={val.value} visited={val.visited} name="square safe"/>
        } else {
          return <Square safe={val.safe} key={val.id} handleClick={() => this.props.handleClick(i)} display={val.value} visited={val.visited} name="square notSafe"/>
        }
      } else {
        return <Square safe={val.safe} key={val.id} handleClick={() => this.props.handleClick(i)} display={val.value} visited={val.visited} name="square"/>
      }
    })
    return (
      <div className='row'>
        {squares}
      </div>
    )
  }
}

export default Row;