import { Meteor } from 'meteor/meteor';

const Circles = new Mongo.Collection('circles');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('circles', function circlesPublication() {
        return Circles.find();
    });
}

Meteor.methods({

});

export default Circles