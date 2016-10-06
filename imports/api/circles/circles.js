import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const Circles = new Mongo.Collection('circles', {
    transform: function(doc) {
        doc.membersObj = Meteor.users.find({
            _id: { $in: doc.members }
        });
        return doc;
    }
});

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish jewels that are public or belong to the current user
    Meteor.publish('circles', function circlesPublication() {
        return Circles.find();
    });

    Meteor.publish('mycircles', function myCirclesPublication() {
        return Circles.find({userId: this.userId});
    });

    Meteor.publish('mycirclewithusers', function myCircleWithFriends() {
        return [
            Circles.find({userId: this.userId}),
            Meteor.users.find({
                _id: {
                    $in: circle.members
                }
            })
        ];
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
    //One way friend adding, i.e. they can see your posts, but you can't see theirs
    'circles.addFriend'(friendId, circleId) {
        check(friendId, String);
        check(circleId, String);

        const circle = Circles.findOne(circleId);
        if (circle.userId !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Circles.update({_id: circleId}, {$push: {members: friendId}})
    },
    // 'circles.getMemberDetails'(circleId) {
    //     check(circleId, String);

    //     return Circles.aggregate([
    //         {
    //             $unwind:"$members"
    //         },
    //         {
    //             $lookup:
    //             {
    //                 from:"users",
    //                 localField:"members",
    //                 foreignField:"_id",
    //                 as:"users_docs"
    //             }
    //         },
    //         {
    //             $match:
    //             {
    //                 "users_docs": {$ne: []}
    //             }
    //         }
    //     ])
    // },
});

export default Circles