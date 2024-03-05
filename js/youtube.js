var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = [];

function onYouTubePlayerAPIReady() {
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

function handleStateChange(event, index) {
  if (event.data === YT.PlayerState.PLAYING) {
    players[index].stopVideo();
  }
}

const stopBtnEls = document.querySelectorAll('#youtube .xi-close');

stopBtnEls.forEach((stopBtnEl, index) => {
  stopBtnEl.addEventListener('click', () => {
    handleStateChange({ data: players[index].getPlayerState() }, index);
  });
});