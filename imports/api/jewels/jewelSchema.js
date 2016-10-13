import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';
import ObjectComponent from 'simple-react-form-material-ui/lib/object';
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import Checkbox from 'simple-react-form-material-ui/lib/checkbox';
import ArrayComponent from 'simple-react-form-material-ui/lib/array';

import Category from '../../ui/Category.jsx';

import CoordinateSchema from '../helpers';
//import RatingSchema from '../helpers';

import Jewels from './jewels';

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

const RatingSchema = new SimpleSchema({
    value: {
        type: Number,
        decimal: true,
        min: 0,
        max: 5,
        srf: {
            type: Text
        }
    },
    raterId: {
        type: String,
        autoValue: function() {
            return this.userId
        },
        srf: {
            omit: true,
            type: Text
        }
    },
    ratedAt: {
        type: Date,
        autoValue: function() {
            return new Date()
        },
        srf: {
            omit: true
        }
    }
})

//Trick to get simple-react-forms package to display
//the participants
const ParticipantSchema = new SimpleSchema({
    participantId: {
        type: String,
        srf: {
            type: Text
        }
    }
})

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
        //optional: true,
        label: 'Date (optional)',
        max: function() {
            return new Date()
        },
        autoValue:function(){
            if(this.isSet==false)
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
    category: {
        type: String,
        optional: true,
        label: 'Category (optional)',
        srf: {
            type: Category
        }
    },
    coordinates: {
        type: CoordinateSchema,
        optional:true,
        autoValue:function(){
            if(this.isSet==false){
                const userId=Meteor.userId();
                return Meteor.call('profiles.getLocation',userId);
            }
        },
        srf: {
            type: ObjectComponent
        }
    },
    private: {
        type: Boolean,
        // autoValue: function() {
        //     return false
        // },
        optional: true,
        srf: {
            type: Checkbox
        }
    },
    participants: {
        type: [ParticipantSchema],
        optional: true,
        srf: {
            omit: false,
            type: ArrayComponent
        }
    },
    rating: {
        type: [RatingSchema],
        optional: true,
        srf: {
            omit: true,
            type: ArrayComponent
        }
    },
    flagged: {
        type: Boolean,
        autoValue:function() {
            return false
        },
        label: 'Flag',
        srf: {
            omit: true,
            type: Checkbox
        }
    }
});

export default Jewels;
