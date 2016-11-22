"use strict";

let videoPlayer = {
  usable: false,
  player: null,
  prepare: (options) => {
    App.VideoPlayer.player = videojs('#videoplayer');
    App.VideoPlayer.player.ready(function() {
      console.info("VideoPlayer is ready");
      if(window.initializePlayerLocals
        && typeof window.initializePlayerLocals === 'function') {
          window.initializePlayerLocals(App.VideoPlayer.player);
        }
    });
    // var video = videojs('video-js').ready(function(){
    //   var player = this;
            // 
    				// player.persistvolume({
    				// 	namespace: "vjs-Volume"
    				// });

    //
    //   player.on('loadedmetadata', function() {
    //     $('.vjs-big-play-button').addClass('vjs-pm-show-big-play');
    //     $('.vjs-control-bar').css({"display": "block"});
    //   });
    //
    //   player.on('error', function(){
    //     var MediaError = player.error();
    //
    //     if (MediaError.code == 4) {
    //       ajax_request("video", "do=report&vid={/literal}{$video_data.uniq_id}{literal}&error-message="+ MediaError.message, "", "", false);
    //     }
    //   });
    //
    //
    //   player.logobrand({
    //     image: "{/literal}{$smarty.const._WATERMARKURL}{literal}",
    //     destination: "{/literal}{$smarty.const._WATERMARKLINK}{literal}"
    //   });
    //
    //   player.src([
    //     {
    //       src: "{/literal}{$smarty.const._URL2}/videos.php?vid={$video_data.uniq_id}{literal}",
    //       type: "video/mp4"
    //     }
    //   ]);
    // });
  },
  detectAndPrepare: (options) => {
    if(!App.Shorthands.Videoplayer) {
      let player = $("#videoplayer");
      if(player.size() > 0) {
        App.Shorthands.Videoplayer = player;
        App.State.pageHasVideoplayer = true;
      }
    }

    if(App.State.pageHasVideoplayer === true) {
      console.info("Preparing videoplayer");
      App.VideoPlayer.prepare();
      return true;
    } else {
      return false;
    }
  }
};

module.exports = videoPlayer;
