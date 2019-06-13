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
  let timePassed = '';

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
  let outputHTML = '';

  if (tweet) {
    const timePassed = timeSinceUnixDate(tweet.created_at);

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

$(document).ready(function() {

  // load tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (loadedTweets) {
        $('#tweets-container').append(renderTweets(loadedTweets));
    });
  }

  // submit new tweet
  const $tweetForm = document.querySelector('#submit-tweet');

  $tweetForm.addEventListener('submit', function(ev) {
    ev.preventDefault();

    $.ajax({
      url:    '/tweets',
      method: 'POST',
      data:   $(this).serialize()
    })
    .done(function() {
      console.log(`success`);
    })
    .fail(function(err) {
      console.log( `error: ${err.statusText}` );
    });

  });

  loadTweets();

});
