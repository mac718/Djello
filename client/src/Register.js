import React, {Component} from 'react';

class Resister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state))
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then(res => {
        if(res.status === 200) {
          console.log('Yay!')
          //this.props.history.push('/');
        } else {
          const error = new Error(res.error)
          throw error;
        }
      })
      .catch(err => {
        console.log(err);
        alert('Error logging in');
      })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Enter Username</label>
          <div className="control">
            <input 
              className="input" 
              name='username' 
              type="text" 
              placeholder="Username" 
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Enter Password</label>
          <div className="control">
            <input 
              className="input" 
              name='password' 
              type="password" 
              placeholder="Password" 
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="control">
          <button className="button is-primary is-light">Submit</button>
        </div>
      </form>  
    )
  }
}

export default Resister;