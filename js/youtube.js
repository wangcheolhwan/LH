var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
console.log('script loaded');

var players = [];

window.onYouTubePlayerAPIReady = function () {
  players.push(new YT.Player('player_01', {
    videoId: '1mK1MOwWcM4',
  }));

  players.push(new YT.Player('player_02', {
    videoId: 'odxnQoQFNRc',
  }));

  players.push(new YT.Player('player_03', {
    videoId: 'w5TmD_nhCiY',
  }));
}
console.log(players);

function youtubeExit(event, index) {
  
  if (event.data === YT.PlayerState.PLAYING) {
    players[index].stopVideo();
  }
}

function stopVideo() {
  player.stopVideo();
}

const stopBtnEls = document.querySelectorAll('#youtube .xi-close');
console.log(stopBtnEls)

stopBtnEls.forEach((stopBtnEl, index) => {
  stopBtnEl.addEventListener('click', () => {
    youtubeExit({ data: players[index].getPlayerState() }, index);
  });
});