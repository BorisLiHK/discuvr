import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

// route components
import App from '../../ui/App'
import MapContainer from '../../ui/MapContainer'
import LoginPage from '../../ui/LoginPage'
import LogoutPage from '../../ui/LogoutPage'
import Profile from '../../ui/Profile'
import CreateJewelPage from '../../ui/CreateJewelPage'
import CreateCirclePage from '../../ui/CreateCirclePage'
import CreateProfilePage from '../../ui/CreateProfilePage'
import ViewJewelPage from '../../ui/ViewJewelPage';
import AddFriendPage from '../../ui/AddFriendPage';
import MyJewelsList from '../../ui/MyJewelsList';
import MyCirclesList from '../../ui/MyCirclesList';
import FindUserPage from '../../ui/FindUserPage';

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

function loggingOutUser(){
    if(Meteor.userId())
    {
        Meteor.logout();
    }
}

function redirectToProfile(nextState, replace){
    //logic to redirect from profile to create-profile if the user has no profile
    //redirect from create-profile to profile if the user already has one
    /*
    if(Profiles.find().count()>0){
        replace({
            pathname:'/profile',
            state:{nextPathname:nextState.location.pathname}
        })
    else{
        replace({
            pathname:'/create-profile',
            state:{nextPathname:nextState.location.pathname}
        })
    }
    }
    */
}

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={MapContainer} onEnter={redirectToLogin} />
            {/*<Route path="history" component={History} onEnter={redirectToLogin} />*/}
            <Route path="login" component={LoginPage} onEnter={redirectToMap} />
            <Route path="logout" component={LogoutPage} onEnter={loggingOutUser} />
            <Route path="profile" component={Profile} onEnter={redirectToProfile} />
            <Route path="create-jewel" component={CreateJewelPage} />
            <Route path="my-jewels" component={MyJewelsList} />
            <Route path="view-jewel" component={ViewJewelPage} />
            <Route path="create-circle" component={CreateCirclePage} />
            <Route path="my-circles" component={MyCirclesList} />
            <Route path="add-friend" component={AddFriendPage} />
            <Route path="create-profile" component={CreateProfilePage} onEnter={redirectToProfile} />
            <Route path="test" component={FindUserPage} />
        </Route>
    </Router>
);

Accounts.onLogin( () => {
    if (Meteor.isClient){
        var path = location.pathname;

        if(path !== '/login'){
            return       
        }
        browserHistory.push('/')
    
    }
});

