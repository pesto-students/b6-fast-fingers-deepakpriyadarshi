import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';

import './App.css';
import GuestLogin from './pages/GuestLogin';
import Game from './pages/Game';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route exact path="/guest" component={GuestLogin}></Route>
                <Route exact path="/game">
                    <Game></Game>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
