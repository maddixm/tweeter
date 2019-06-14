'use strict';

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require('./util/simulate-delay');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, function(err, r) {

        if(err) {
          console.log("Error adding tweet: ", err);
        } else {
          callback(null, true);
        }

      });
    },

    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, tweets) => {

        if (err) {
          console.log('Error getting tweets: ', err);
          return err;
        } else {
          const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          callback(null, tweets.sort(sortNewestFirst)); // needs callback b/c async
        }

      });
    }

  }
}
