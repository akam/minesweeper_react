import React, { Component } from 'react';
import './Board.css';
import Row from './Row'

var BOARD_SIZE = 6;

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      squares: []
    }
  }

  componentWillMount(){
    let row = [];
    let squares = [];
    let id = 0;
    for(var i = 0; i < BOARD_SIZE; i++){
      row = [];
      for(var j = 0; j < BOARD_SIZE; j++){
        Math.random() < 0.9 ? row.push({value: null, safe: true, id: id, visited: false}) : row.push({value: null, safe: false, id: id, visited: false});
        id++;
      }
      squares.push(row);
    }
    this.setState({squares})
  }

  countNotSafe(squares, row, id){
    let counter = 0;
    var up = row - 1;
    var left = id - 1;
    var right = id + 1;
    var down = row + 1;
    //check up
    if(row > 0 && !squares[up][id].safe){ counter++; }
    //check left
    if(id > 0 && !squares[row][left].safe){ counter++; }
    //check right
    if(id < BOARD_SIZE - 1 && !squares[row][right].safe){ counter++; }
    //check down
    if(row < BOARD_SIZE - 1 && !squares[down][id].safe){ counter++; }
    //check up, left
    if(row > 0 && id > 0 && !squares[up][left].safe){ counter++; }
    //check up, right
    if(row > 0 && id < BOARD_SIZE - 1 && !squares[up][right].safe){ counter++; }
    //check down, left
    if(row < BOARD_SIZE - 1 && id > 0 && !squares[down][left].safe){ counter++; }
    //check down, right
    if(row < BOARD_SIZE - 1 && id < BOARD_SIZE - 1 && !squares[down][right].safe){ counter++; }
    return counter;
  }

  pushAdj(queue, squares, row, id){
    var up = row - 1;
    var left = id - 1;
    var right = id + 1;
    var down = row + 1;
    //check up
    if(row > 0 && !squares[up][id].visited){ queue.push({row: up, id}); }
    //check left
    if(id > 0 && !squares[row][left].visited){ queue.push({row, id: left}); }
    //check right
    if(id < BOARD_SIZE - 1 && !squares[row][right].visited){ queue.push({row, id: right}); }
    //check down
    if(row < BOARD_SIZE - 1 && !squares[down][id].visited){ queue.push({row: down, id}); }

    return queue;
  }

  handleClick(row, id){
    let squares = [...this.state.squares];
    let queue = [];
    if(squares[row][id].safe){
      queue.push({row,id});
      while(queue.length !== 0){
        let next = queue.shift();
        row = next.row;
        id = next.id;
        squares[row][id].value = this.countNotSafe(squares, row, id);
        squares[row][id].visited = true;
        if(squares[row][id].value === 0){
          queue = this.pushAdj(queue, squares, row, id)
        }
      }
      this.setState({squares});
    } else {
      squares[row][id].value = "X";
      squares[row][id].visited = true;
      this.setState({squares});
    }
  }

  render() {
    let rows = this.state.squares.map((val, i) => (
      <Row squares={val} handleClick={this.handleClick.bind(this, i)} key={i}/>
    ))
    return (
      <div>
        {rows}
      </div>
    )
  }
}

export default Board;