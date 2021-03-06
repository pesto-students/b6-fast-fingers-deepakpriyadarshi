import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';

import './App.css';
import GuestLogin from './pages/GuestLogin';
import PlayerLogin from './pages/PlayerLogin';
import Game from './pages/Game';
import Result from './pages/Result';
import PlayerDashboard from './pages/PlayerDashboard';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Welcome}></Route>
                <Route exact path="/guest" component={GuestLogin}></Route>
                <Route exact path="/login" component={PlayerLogin}></Route>
                <Route exact path="/game" render={(props) => <Game {...props} />}></Route>
                <Route exact path="/result" render={(props) => <Result {...props} />}></Route>

                <Route exact path="/dashboard" component={PlayerDashboard}></Route>
            </Switch>
        </Router>
    );
}

export default App;
