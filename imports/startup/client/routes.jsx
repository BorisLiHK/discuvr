import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// route components
import App from '../../ui/App'
import LoginPage from '../../ui/LoginPage'
import CreateJewelPage from '../../ui/CreateJewelPage'
import CreateCirclePage from '../../ui/CreateCirclePage'
import ProfilePage from '../../ui/ProfilePage'
import ViewJewelPage from '../../ui/ViewJewelPage';
import AddFriendPage from '../../ui/AddFriendPage';
import MyJewelsList from '../../ui/MyJewelsList';
import MyCirclesList from '../../ui/MyCirclesList';
import JewelList from '../../ui/JewelList';

function redirectToMap(nextState, replace) {
  if (Meteor.userId() !== null) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirectToLogin(nextState, replace) {
  if (!Meteor.userId() && !location.pathname.includes('login')) {
    replace({
      pathname: 'login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={redirectToLogin}>
      <Route path="login" component={LoginPage} onEnter={redirectToMap}/>

      <Route path="create-jewel" component={CreateJewelPage}/>
      <Route path="my-jewels" component={MyJewelsList}/>
      <Route path="view-jewel" component={ViewJewelPage}/>
      <Route path="create-circle" component={CreateCirclePage}/>
      <Route path="my-circles" component={MyCirclesList}/>
      <Route path="add-friend" component={AddFriendPage}/>
      <Route path="my-profile" component={ProfilePage}/>
      <Route path="jewel-list" component={JewelList}/>
    </Route>
  </Router>
);

Accounts.onLogin(() => {
  if (Meteor.isClient) {
    var path = location.pathname;

    if (path !== '/login') {
      return
    }
    browserHistory.push('/')

  }
});

