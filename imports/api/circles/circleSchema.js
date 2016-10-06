import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';
import ObjectComponent from 'simple-react-form-material-ui/lib/object';
import Textarea from 'simple-react-form-material-ui/lib/textarea';
//import SelectWithMethod from 'simple-react-form-material-ui/lib/select-with-method';

import Circles from './circles'



SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

Circles.attachSchema({
    userId: {
        type: String,
        autoValue: function() {
            return this.userId
        },
        srf: {
            omit: true
        }
    },
    createdAt: {
    	type: Date,
        autoValue: function()  {
            return new Date()
        },
    	srf: {
            omit: true
    	}
    },
    title: {
        type: String,
        max: 100,
        srf: {
            type: Text
        }
    },
    members: {
        type: [String],
        optional: true,
        srf: {
            omit: true
        }
    },
});

export default Circles;
