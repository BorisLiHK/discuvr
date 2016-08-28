/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Jewels } from './jewels.js';

if (Meteor.isServer) {
    describe('Jewels', () => {
        describe('methods', () => {
            const userId = Random.id();
            let jewelId;

            beforeEach(() => {
                Jewels.remove({});
                jewelId = Jewels.insert({
                    text: 'test jewel',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });
            });

            it('can delete owned jewel', () => {
                // Find the internal implementation of the jewel method so we can
                // test it in isolation
                const deleteJewel = Meteor.server.method_handlers['jewels.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteJewel.apply(invocation, [jewelId]);

                // Verify that the method does what we expected
                assert.equal(Jewels.find().count(), 0);
            });
        });
    });
}
