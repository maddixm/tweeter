/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// return # of days/hours/minutes since a time
const timeSinceUnixDate = function( unixDate ) {

  const currentDate = Date.now();
  const msecPassed = currentDate - unixDate;  // milliseconds
  const seconds = Math.round(msecPassed / 1000);  // ms per sec
  const minutes = Math.round(msecPassed / 60000); // ms per min
  const hours = Math.round(msecPassed / 3.6e+6);  // ms per hour
  const days = Math.round(msecPassed / 8.64e+7);  // ms per day
  let timePassed = "";

  if (days >= 1 ) {
    timePassed += `${days} day`;
    timePassed += days > 1 ? `s` : ``;
  } else if (hours >= 1) {
    timePassed += `${hours} hour`;
    timePassed += hours > 1 ? `s` : ``;
  } else if (minutes >= 1) {
    timePassed += `${minutes} minute`;
    timePassed += minutes > 1 ? `s` : ``;
  } else {
    timePassed += `${seconds} second`;
    timePassed += seconds > 1 ? `s` : ``;
  }
  timePassed += ` ago`;

  return timePassed;

}

// takes in a tweet object and returns an <article>
// containing the entire HTML structure of the tweet.
const createTweetElement = function(tweetData) {

  const tweet = tweetData;
  let outputHTML = "";

  if (tweet) {
    let timePassed = timeSinceUnixDate(tweet.created_at);

    outputHTML = `
      <article class="tweet grey-border">
      <header>
      <img src="${tweet.user.avatars.small}" class="avatar">
      <span class="user-full-name">${tweet.user.name}</span>
      <span class="user-handle">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer class="footer grey-border-top">
        <p>${timePassed}</p>
        <span class="footer-images">
          <!-- from https://feathericons.com/ -->
          <img class="logo" src="/images/flag.svg">
          <img class="logo" src="/images/repeat.svg">
          <img class="logo" src="/images/heart.svg">
        </span>
      </footer>
    </article>
    `;
  }

  return outputHTML;

}

const renderTweets = function(tweets) {

  let arrTweets = [];

  for( let tweet in tweets) {
    arrTweets.push(createTweetElement(tweets[tweet]));
  }

  return arrTweets;

}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


$(document).ready(function() {

  // load tweets as soon as the document it ready
  var $tweets = renderTweets(data);
  $('#tweets-container').append($tweets);

});
