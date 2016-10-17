import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes'
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../imports/startup/accounts-config';

injectTapEventPlugin();

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('render-target'));
});
