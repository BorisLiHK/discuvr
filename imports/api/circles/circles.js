import { Meteor } from 'meteor/meteor';

const Circles = new Mongo.Collection('circles');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('circles', function circlesPublication() {
        return Circles.find();
    });

    Meteor.publish('mycircles', function myCirclesPublication() {
        return Circles.find({userId: this.userId});
    });
}

Meteor.methods({
    'circles.remove'(circleId) {
        check(circleId, String);

        const circle = Circles.findOne(circleId);
        if (circle.userId !== this.userId) {
            // Only the owner can delete the circle
            throw new Meteor.Error('not-authorized');
        }

        Circles.remove(circleId);
    },
});

export default Circles