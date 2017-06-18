import React, { Component } from 'react';
import './Board.css';
import Row from './Row';
import NewGameForm from "./NewGameForm";


class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      boardSize: 5,
      squares: [],
      visited: 0,
      status: 3,
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  newGame(){
    let status = 0;
    let visited = 0;
    let row = [];
    let squares = [];
    let id = 0;
    let mines = this.state.boardSize - 1;
    for(var i = 0; i < this.state.boardSize; i++){
      row = [];
      for(var j = 0; j < this.state.boardSize; j++){
        row.push({value: null, safe: true, id: id, visited: false});
        id++;
      }
      squares.push(row);
    }
    let k = 0;
    var r;
    var c;
    while(k < mines){
      r = Math.floor(Math.random() * this.state.boardSize);
      c = Math.floor(Math.random() * this.state.boardSize);
      if(squares[r][c].safe === true){
        squares[r][c].safe = false;
        k++;
      }
    }
    this.setState({visited,status,squares})
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
    if(id < this.state.boardSize - 1 && !squares[row][right].safe){ counter++; }
    //check down
    if(row < this.state.boardSize - 1 && !squares[down][id].safe){ counter++; }
    //check up, left
    if(row > 0 && id > 0 && !squares[up][left].safe){ counter++; }
    //check up, right
    if(row > 0 && id < this.state.boardSize - 1 && !squares[up][right].safe){ counter++; }
    //check down, left
    if(row < this.state.boardSize - 1 && id > 0 && !squares[down][left].safe){ counter++; }
    //check down, right
    if(row < this.state.boardSize - 1 && id < this.state.boardSize - 1 && !squares[down][right].safe){ counter++; }
    return counter;
  }

  pushAdj(queue, squares, row, id){
    var up = row - 1;
    var left = id - 1;
    var right = id + 1;
    var down = row + 1;
    //check up
    if(row > 0 && !squares[up][id].visited){ 
      squares[up][id].visited = true;
      queue.push({row: up, id}); 
    }
    //check left
    if(id > 0 && !squares[row][left].visited){ 
      squares[row][left].visited = true;
      queue.push({row, id: left}); 
    }
    //check right
    if(id < this.state.boardSize - 1 && !squares[row][right].visited){ 
      squares[row][right].visited = true;
      queue.push({row, id: right}); 
    }
    //check down
    if(row < this.state.boardSize - 1 && !squares[down][id].visited){
      squares[down][id].visited = true;
      queue.push({row: down, id}); 
    }
    //check up, left
    if(row > 0 && id > 0 && !squares[up][left].visited){
      squares[up][left].visited = true;
      queue.push({row: up, id: left}); 
    }
    //check up, right
    if(row > 0 && id < this.state.boardSize - 1 && !squares[up][right].visited){
      squares[up][right].visited = true;
      queue.push({row: up, id: right}); 
    }
    //check down, left
    if(row < this.state.boardSize - 1 && id > 0 && !squares[down][left].visited){
      squares[down][left].visited = true;
      queue.push({row: down, id: left}); 
    }
    //check down, right
    if(row < this.state.boardSize - 1 && id < this.state.boardSize - 1 && !squares[down][right].visited){ 
      squares[down][right].visited = true;
      queue.push({row: down, id: right}); 
    }
    return queue;
  }

  handleClick(row, id){
    let squares = [...this.state.squares];
    let queue = [];
    let visited = this.state.visited;
    var counter = 0;
    if(squares[row][id].safe && !squares[row][id].visited){
      queue.push({row,id});
      while(queue.length !== 0){
        let next = queue.shift();
        visited++;
        row = next.row;
        id = next.id;
        squares[row][id].visited = true;
        counter = this.countNotSafe(squares, row, id);
        if(counter === 0){
          squares[row][id].value = ''
        } else {
          squares[row][id].value = counter;
        }
        if(counter === 0){
          queue = this.pushAdj(queue, squares, row, id)
        }
      }
      this.setState({visited,squares});
    } else if (!squares[row][id].visited){
      squares[row][id].value = "X";
      squares[row][id].visited = true;
      //change state to lose
      this.setState({squares});
      this.handleStatus(1);
    }
    //check win condition.
    if(visited === (this.state.boardSize*this.state.boardSize) - (this.state.boardSize - 1)){
      this.handleStatus(2);
    }
  }

  handleStatus(status){
    this.setState({status});
  }

  handleReset(){
    this.newGame();
  }

  handleSubmit(boardSize){
    this.setState({boardSize}, function(){
      this.handleReset();
    })
  }
  
  render() {
    let rows = this.state.squares.map((val, i) => {
      if(this.state.status === 0){
        return <Row squares={val} handleClick={this.handleClick.bind(this, i)} key={i}/>
      } else {
        return <Row squares={val} handleClick={() => console.log("start new game")} key={i}/>
      }
    })
    return (
      <div>
        {this.state.status === 1 ? <h1>You lose!</h1> : '' }
        {this.state.status === 2 ? <h1>You Win!</h1> : '' }
        {this.state.status > 0 ? <NewGameForm boardSize={this.state.boardSize} handleSubmit={this.handleSubmit}/> : ''}
        {rows}
      </div>
    )
  }
}

export default Board;