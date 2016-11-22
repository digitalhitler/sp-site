'use strict';
/*
 * @description  Third-party initialization scripts
 */

const thirdParties = {
  initializeAll: () => {
    for(let curr in thirdParties) {
      if(thirdParties.hasOwnProperty(curr)
      && typeof thirdParties[curr] === 'function'
      && curr !== 'initializeAll') {
        thirdParties[curr]();
      }
    }
  },

  yandexMetrica: () => {

  },

  rollbar: () => {

  },

  googleAnalytics: () => {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-87383234-1', 'auto');
    ga('send', 'pageview');
  }
};

module.exports = thirdParties;
