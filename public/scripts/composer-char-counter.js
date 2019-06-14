"use strict";

$(document).ready(function() {

  const $tweetArea = $('textarea');
  const maxTweetLength = 140;

  $tweetArea.on('keydown', function(ev) {
    ev.stopPropagation(); // stops event from propogating outwards
    const tweetLength = $(this).val().length;
    const charCounter = $(this).siblings(".counter");
    const charsLeft = maxTweetLength - tweetLength;

    charCounter.html(charsLeft); // use html when in span

    if( charsLeft < 0 ) {
      $(this).addClass("tweet-err");
    } else {
      $(this).removeClass("tweet-err");
    }

  });

});