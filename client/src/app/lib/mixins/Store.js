"use strict";

const riot = window.Riot || require('riot');
const log = window.GetDebugger('mixin:store');
const CStore = require("../objects/CStore");

const StoreMixin = {
  init: function() {
    return true;
  },

  getStore: function(name) {
    let store = new CStore(name);
    log(`Resolved store ${name}.`);
    return store;
  }

};

riot.mixin('Store', StoreMixin);

module.exports = StoreMixin;
