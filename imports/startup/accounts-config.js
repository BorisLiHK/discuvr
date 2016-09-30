import { Accounts } from 'meteor/zetoff:accounts-material-ui';
import { browserHistory } from 'react-router'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    onSignedInHook: () => browserHistory.push('/'),
    onSignedOutHook: () => browserHistory.push('login')
});

if (Meteor.isServer) {
    Accounts.onCreateUser(function (options, user) {
        user.profile = options.profile || {};
        user.roles = {};
        return user;
    })
}
