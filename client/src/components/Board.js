import React, {Component} from 'react';

class Board extends Component {
  handleLogOut = () => {
    fetch('/logout', {
      method:'POST'
    })
      .then(res => console.log(res));
  }
  render() {
    return(
      <div className='Board'>
        Hello, I'm a board!
        <button className='button' onClick={this.handleLogOut}>Log Out</button>
      </div>
    )
  }
}

export default Board;