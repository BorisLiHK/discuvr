import { Meteor } from 'meteor/meteor';

const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('profiles', function profilesPublication() {
        return Profiles.find();
    });
}

Meteor.methods({

});

export default Profiles