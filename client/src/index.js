import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, } from 'react-router-dom';
import './index.css';
import Standings from './Standings';
import Rankings from './Rankings';
import Scoreboard from './Scoreboard';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Standings} />
            <Route exact path='/rankings' component={Rankings} />
            <Route exact path='/scoreboard' component={Scoreboard} />
        </div>
    </BrowserRouter>
    , 
    document.getElementById('root')
);
registerServiceWorker();
