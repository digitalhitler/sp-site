"use strict";

/**
app
Component (tag) for riot.js
Wrapped into SPTools environment.
Made by Getrix in 2016
Based on riot-component-template by Sergey Petrenko <spetrenko@me.com>

https://github.com/digitalhitler/riot-component-template

*/

const riot = window.Riot || require('riot');

const CColor = require("../../lib/objects/CColor");

const log = require('debug')('app:ui');

const componentTemplate = `
<div id="app">
<yield></yield>
</div>
`;

const componentHandler = function ApplicationHandler() {
  this.mixin('Store');
  this.mixin('Component');

  // === General methods === //
  // this method loads component initial state & must properly reset state from any position to scratch point.
  this.on('mount', () => {
    this.initializeState({
      storeApplication: this.getStore('Application'),
      storeComponents: this.getStore('Components'),
      storeGlobal: this.getStore('Global'),
      active: true,
      focused: true,
      loading: false,
      navigation: {
        lastNavigatedAt: Date.now()
      }
    });

    if(window.App) {
      if(!App.MountPoint) {
        App.MountPoint = this;
      }
    }
  });


  // === Events === //
  this.on('update', () => {
    log('Update triggered: ', this);
  });

  this.on('unmount', () => {
  });

};

const Application = riot.tag('app', componentTemplate, componentHandler);

module.exports = Application;
