var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = [];

function onYouTubePlayerAPIReady() {
  players.push(new YT.Player('player_01', {
    videoId: '1mK1MOwWcM4',
    events: {
      onReady: function (event) {
      }
    }
  }));

  players.push(new YT.Player('player_02', {
    videoId: 'odxnQoQFNRc',
    events: {
      onReady: function (event) {
      }
    }
  }));

  players.push(new YT.Player('player_03', {
    videoId: 'w5TmD_nhCiY',
    events: {
      onReady: function (event) {
      }
    }
  }));
}

const stopBtnEls = document.querySelectorAll('#youtube .xi-close');
console.log(stopBtnEls);

stopBtnEls.forEach((stopBtnEl, index) => {
  stopBtnEl.addEventListener('click', () => {
    players[index].stopVideo();
  })
})