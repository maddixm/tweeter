"use strict";

$(document).ready(function() {

  let $tweetArea = $('textarea');
  const maxTweetLength = 140;

  $tweetArea.on('keydown', function(ev) {
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