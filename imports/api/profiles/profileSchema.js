import{Match}from'meteor/check'
import{SimpleSchema}from'meteor/aldeed:simple-schema';
import Text from'simple-react-form-material-ui/lib/text';
import ObjectComponent from'simple-react-form-material-ui/lib/object';
import Textarea from'simple-react-form-material-ui/lib/textarea';

import Profiles from'./profiles';

SimpleSchema.extendOptions({
	srf:Match.Optional(Object)
});

Profiles.attachSchema({
	userId:{
		type:String,
		autoValue:function(){
			return this.userId
		},
		srf:{
			omit:true
		}
	},
	firstName:{
		type:String,
		max:50,
		srf:{
			type:Text
		}
	},
	lastName:{
		type:String,
		max:50,
		srf:{
			type:Text
		}
	}
});

export default Profiles;