import { Accounts } from 'meteor/zetoff:accounts-material-ui';
import { browserHistory } from 'react-router'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    onSignedInHook: () => browserHistory.push('/'),
    onSignedOutHook: () => browserHistory.push('login')
});
