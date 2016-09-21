import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';

const Jewels = new Mongo.Collection('jewels');

CoordinateSchema = new SimpleSchema({
    longitude: {
        type: Number
    },
    lattitude: {
        type: Number
    }
});

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
    coordinates: {
        type: CoordinateSchema
    }
});

export default Jewels;
