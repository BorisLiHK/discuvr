import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check'
import moment from 'moment';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';
import ArrayComponent from 'simple-react-form-material-ui/lib/array';
import ObjectComponent from 'simple-react-form-material-ui/lib/object';

const Jewels = new Mongo.Collection('jewels');

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

Jewels.attachSchema({
    userId: {
        type: String,
        srf: {
        	type: Text
        }
    },
    createdat: {
    	type: Date,
    	srf: {
    		type: DatePicker
    	}
    },
});

export default Jewels;