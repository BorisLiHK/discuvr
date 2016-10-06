import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';
import ObjectComponent from 'simple-react-form-material-ui/lib/object';
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import CoordinateSchema from '../helpers'

import Jewels from './jewels'

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
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
    date: {
        type: Date,
        optional: true,
        label: 'Date (optional)',
        max: function() {
            return new Date()
        },
        srf: {
            type: DatePicker
        }
    },
    description: {
        type: String,
        optional: true,
        label: 'Description (optional)',
        max: 1000,
        srf: {
            type: Textarea
        }
    },
    coordinates: {
        type: CoordinateSchema,
        srf: {
            type: ObjectComponent
        }
    },
    /*audiences:{
        type: String,
        srf:{
            //omit:true
            type://Picker
        }
    },*/
});

export default Jewels;
