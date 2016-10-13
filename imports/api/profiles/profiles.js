import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {browserHistory} from 'react-router';

const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('profiles', function profilesPublication() {
        return Profiles.find();
    });
    Meteor.publish('myprofiles',function prfilesPublication(){
    	return Profiles.find({userId:this.userId});
    });
}

Meteor.methods({
	'profiles.updateLocation'(userId,pos){
		check(userId,String);
		const profile=Profiles.findOne({userId: userId});
		if(profile){
			//browserHistory.push('/my-profile');
			Profiles.update({userId:userId},{$set:{location:{latitude: pos[1], longitude: pos[0]}}});
		}
		else{
			browserHistory.push('/my-profile');
		}
	},
	'profiles.getLocation'(userId){
		check(userId,String);
		const profile=Profiles.findOne({userId:userId});
		return profile.location;
	}
});

export default Profiles