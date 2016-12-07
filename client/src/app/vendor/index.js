"use strict";

if(window) {

  // Framework vars:
  let currentHostname, currentRoot = "/", isDevelopment = false;
  if(window.location && window.location.hostname) {
    if(window.location.hostname === "spetrenko.ru" || window.location.hostname === "www.spetrenko.ru") {
      currentHostname = "spetrenko.ru";
    } else if(window.location.hostname === "dev.spetrenko.ru" || window.location.hostname === "localhost") {
      currentHostname = "dev.spetrenko.ru";
      isDevelopment = true;
    } else {
      currentHostname = "spetrenko.ru";
    }
  }
  window.__CURRENT_HOSTNAME = currentHostname;
  window.__CURRENT_DOCUMENTROOT = currentRoot;


  // Dependencies:
  window.Moment = require("moment");
  window.Riot = require("riot");
  window.Debug = require("debug");
  window.ModernizrModule = require("./modernizr");
  window.GradientEngine = require("granim");

  Moment.locale('ru');

  // Dependencies loaded flag:
  window.__vendorPackageLoaded = true;

}
