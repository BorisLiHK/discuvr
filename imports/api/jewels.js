import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Jewels = new Mongo.Collection('jewels');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('jewels', function jewelsPublication() {
        return Jewels.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'jewels.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a jewel
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Jewels.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'jewels.remove'(jewelId) {
        check(jewelId, String);

        const jewel = Jewels.findOne(jewelId);
        if (jewel.private && jewel.owner !== this.userId) {
            // If the jewel is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Jewels.remove(jewelId);
    },
    'jewels.setChecked'(jewelId, setChecked) {
        check(jewelId, String);
        check(setChecked, Boolean);

        const jewel = Jewels.findOne(jewelId);
        if (jewel.private && jewel.owner !== this.userId) {
            // If the jewel is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Jewels.update(jewelId, { $set: { checked: setChecked } });
    },
    'jewels.setPrivate'(jewelId, setToPrivate) {
        check(jewelId, String);
        check(setToPrivate, Boolean);

        const jewel = Jewels.findOne(jewelId);

        // Make sure only the jewel owner can make a jewel private
        if (jewel.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Jewels.update(jewelId, { $set: { private: setToPrivate } });
    },
});
