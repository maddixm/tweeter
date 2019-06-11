"use strict";

$(document).ready(function() {

  let $tweetArea = document.querySelector("textarea");
  const maxTweetLength = 140;

  $tweetArea.addEventListener('keydown', function(ev) {
    ev.stopPropagation(); // stops event from propogating outwards
    let tweetLength = $(this).val().length;
    let charCounter = $(this).siblings(".counter");
    let charsLeft = maxTweetLength - tweetLength;

    charCounter.html(charsLeft); // use html when in span

    if( !charsLeft ) {
      $(this).toggleClass("tweet-err");
    }

  });

});