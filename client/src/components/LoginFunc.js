import React from 'react';

const LoginFunc = ({onSubmit, onUsernameChange, onPasswordChange}) => {
  return (
    <div className='tile is-ancestor is-4' id='login'>
        <div  className='card is-4 form-card'>
          <div className='card-header'>Sign In</div>
          <form onSubmit={onSubmit} className='card-content'>
            <div className="field">
              <label className="label">Enter Username</label>
              <div className="control">
                <input 
                  className="input" 
                  name='username' 
                  type="text" 
                  placeholder="Username" 
                  onChange={onUsernameChange}
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
                  onChange={onPasswordChange}
                />
              </div>
            </div>

            <div className="control">
              <button className="button is-primary is-light is-fullwidth">Sign In</button>
            </div>
          </form>  
        </div>
      </div>
  )
}

export default LoginFunc;