import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';

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
    latitude: {
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
