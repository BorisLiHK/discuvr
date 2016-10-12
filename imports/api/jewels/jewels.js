import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const Jewels = new Mongo.Collection('jewels', {
    transform: function(doc) {
        doc.ownerObj = Meteor.users.find({
            _id: doc.userId
        });
        return doc;
    }
});

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('jewels', function jewelsPublication() {
        return Jewels.find();
    });

    Meteor.publish('myjewels', function myJewelsPublication() {
        return Jewels.find({userId: this.userId});
    });

    Meteor.publish('publicjewels', function publicJewelsPublication() {
        return Jewels.find({private: {$ne:true}});
    });
}

Meteor.methods({
    // 'jewels.insert'(text, date) {
    //     check(text, String);
    //     check(date, String)

    //     // Make sure the user is logged in before inserting a jewel
    //     if (! this.userId) {
    //         throw new Meteor.Error('not-authorized');
    //     }

    //     Jewels.insert({
    //         text,
    //         date: new Date(date),
    //         createdAt: new Date(),
    //         owner: this.userId,
    //         username: Meteor.users.findOne(this.userId).username,
    //     });
    // },
    'jewels.remove'(jewelId) {
        check(jewelId, String);

        const jewel = Jewels.findOne(jewelId);
        if (jewel.userId !== this.userId) {
            // Only the owner can delete the jewel
            throw new Meteor.Error('not-authorized');
        }

        Jewels.remove(jewelId);
    },
    // 'jewels.setChecked'(jewelId, setChecked) {
    //     check(jewelId, String);
    //     check(setChecked, Boolean);

    //     const jewel = Jewels.findOne(jewelId);
    //     if (jewel.private && jewel.owner !== this.userId) {
    //         // If the jewel is private, make sure only the owner can check it off
    //         throw new Meteor.Error('not-authorized');
    //     }

    //     Jewels.update(jewelId, { $set: { checked: setChecked } });
    // },
    // 'jewels.setPrivate'(jewelId, setToPrivate) {
    //     check(jewelId, String);
    //     check(setToPrivate, Boolean);

    //     const jewel = Jewels.findOne(jewelId);

    //     // Make sure only the jewel owner can make a jewel private
    //     if (jewel.owner !== this.userId) {
    //         throw new Meteor.Error('not-authorized');
    //     }

    //     Jewels.update(jewelId, { $set: { private: setToPrivate } });
    // },
});

export default Jewels
