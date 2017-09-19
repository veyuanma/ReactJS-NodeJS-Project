import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import ChatPage from './client/src/chat/ChatPage';
import LetterPage from './client/src/letter/LetterPage';
import QuickAccess from './client/src/quickaccess/QuickAccess';

import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">

          <ul className="nav">
            <li className="nav-item active"><Link to="/ChatPage">Chat Page</Link></li>
            <li className="nav-item active"><Link to="/LetterPage">Letter Page</Link></li>
            <li className="nav-item active"><Link to="/QuickAccess">Quick Access Page</Link></li>
          </ul>

          <Switch>
            <Route path='/ChatPage' component={ChatPage}/>
            <Route path='/LetterPage' component={LetterPage}/>
            <Route path='/QuickAccess' component={QuickAccess}/>
          </Switch>
          
        
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <div>
    <Route path='/' component={App} />
  </div>
   </BrowserRouter>,
   document.getElementById('root')
);
