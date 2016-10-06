import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text';
import DatePicker from 'simple-react-form-material-ui/lib/date-picker';
import ObjectComponent from 'simple-react-form-material-ui/lib/object';
import Textarea from 'simple-react-form-material-ui/lib/textarea'

import Profiles from './profiles'

SimpleSchema.extendOptions({
  srf: Match.Optional(Object)
});

Profiles.attachSchema({
    userId:{
        type:String,
        unique:true,
        autoValue:function(){
            return this.userId
        },
        srf:{omit:true},
    },
    createdAt:{
    	type: Date,
        autoValue:function(){
            return new Date()
        },
    	srf:{omit:true},
    },
    firstName: {
        type:String,
        regEx:/^[A-Za-z]{1,50}$/,
        srf:{type:Text},
    },
    lastName:{
        type:String,
        regEx:/^[A-Za-z]{1,50}$/,
        srf:{type:Text},
    },
    dob:{
        type:Date,
        label:'Date of birth',
        max:function(){
            return new Date()
        },
        srf:{type:DatePicker},
    },
    //location
});

export default Profiles;
