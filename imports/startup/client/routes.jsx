import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

// route components
import App from '../../ui/App'
import MapContainer from '../../ui/MapContainer'
import LoginPage from '../../ui/LoginPage'

function redirectToMap(nextState, replace) {
    if (Meteor.userId()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function redirectToLogin(nextState, replace) {
    if (!Meteor.userId()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={MapContainer} onEnter={redirectToLogin} />
            {/*<Route path="history" component={History} onEnter={redirectToLogin} />*/}
            <Route path="login" component={LoginPage}  onEnter={redirectToMap} />
        </Route>
    </Router>
);
