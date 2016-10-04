/**
 * Created by alex on 30/09/2016.
 */

import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
import XRegExp from 'xregexp'

class NewLogin extends Accounts.ui.LoginForm {
    fields() {
        const { formState } = this.state;
        if (formState == STATES.SIGN_UP) {
            return {
                name: {
                    id: 'name',
                    hint: 'Enter first and last name',
                    label: 'Name',
                    onChange: this.handleChange.bind(this, 'name')
                },
                ...super.fields()
            };
        }
        return super.fields();
    }

    validateName(name) {
        let regex = XRegExp('^[\\p{L}\'-]+( [\\p{L}\'-]+)+$')
        return regex.test(name)
    }

    signUp(options = {}) {
        const { name = null } = this.state;
        if (name === null || !this.validateName(name))
            return
        options.profile = Object.assign(options.profile || {}, {
            name: name,
            firstname: name.split(' ')[0]
        });
        super.signUp(options);
    }
}

export default NewLogin
