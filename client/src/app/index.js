'use strict';

// Load stylesheet
require('../sass/style.scss');

const log = require("debug")("app:entry");

const initializeApplication = () => {
  log("Starting iniialization (vendor loaded: ", window.__vendorPackageLoaded, ")");
  const riot = window.Riot;

  let App = {};
  App.Mixins = require('./lib/mixins');
  App.Components = require('./components');
  App.State = {
    pageHasVideoplayer: false,
  }
  App.Shorthands = {};

  if(window) {
    if(!window.App) {
      window.App = App;

      require('./lib/ui/sidebarHandler');
      require('./lib/ui/scrolledHandler');
      App.ClientPossibilities = require('./lib/tools/clientPossibilities');
      App.VideoPlayer = require('./lib/ui/videoPlayer');

      let initializeMoment = require('./lib/ui/momentBindings');

      $(document).ready(function() {
        initializeMoment();
        App.VideoPlayer.detectAndPrepare();
      });
      console.log('docre3');
    }
  }

  riot.mount("*");
};

initializeApplication();
