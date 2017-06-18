import React, { Component } from 'react';
import './NewGameForm.css';

class NewGameForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: 5,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e){
    this.setState({input: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleSubmit(this.state.input);
  }

  render() {
    return (
      <form className="new">
        <h3>Make New 'X' Sweeper Game!</h3>
        <label htmlFor="input">Square Size:</label>
        <input type="number" min='3' max='15' id="input" value={this.state.input} onChange={this.handleChange}/>
        <input type="submit" onClick={this.handleSubmit}/>
      </form>
    )
  }
}

export default NewGameForm;