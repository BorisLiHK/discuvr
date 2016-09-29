/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Circles } from './circles.js';

if (Meteor.isServer) {
    describe('Circles', () => {
        describe('methods', () => {
            const userId = Random.id();
            let jewelId;

            beforeEach(() => {
                Circles.remove({});
                circleId = Circles.insert({
                    userId: userId,
                    title: 'test circle',
                    createdAt: new Date(),
                    members: ['randomId1', 'randomId2'],
                });
            });

            it('can delete owned circle', () => {
                // Find the internal implementation of the circle method so we can
                // test it in isolation
                const deleteCircle = Meteor.server.method_handlers['circles.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteCircle.apply(invocation, [circleId]);

                // Verify that the method does what we expected
                assert.equal(Circles.find().count(), 0);
            });
        });
    });
}
