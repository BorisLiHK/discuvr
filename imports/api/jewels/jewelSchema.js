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

CoordinateSchema = new SimpleSchema({
    longitude: {
        type: Number,
        decimal: true,
        srf: {
            type: Text
        }
    },
    lattitude: {
        type: Number,
        decimal: true,
        srf: {
            type: Text
        }
    }
});

Jewels.attachSchema({
    userId: {
        type: String,
        autoValue: function() {
            return this.userId
        },
        srf: {
            omit: true
        }
    },
    createdat: {
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
        srf: {
            type: Text
        }
    },
    date: {
        type: Date,
        optional: true,
        srf: {
            type: DatePicker
        }
    },
    coordinates: {
        type: CoordinateSchema,
        srf: {
            type: ObjectComponent
        }
    }
});

export default Jewels;