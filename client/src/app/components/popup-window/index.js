"use strict";

/**
popup-window
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
<div class="popup-window">
<yield></yield>
</div>
`;

const componentHandler = function ApplicationHandler() {
  this.mixin('Store');
  // this.mixin('Component');
  this.applicationStateStore = this.getStore('ApplicationState');

  // === General methods === //
  // this method loads component initial state & must properly reset state from any position to scratch point.

  this.setInitialState = () => {
    this.applicationStateStore.set({
      'document.lastNavigatedAt': Date.now()
    });

    //this.
    //this.applicationStateStore.user = {
    //  away: false,
    //  authorized: false,
    //  id: null,
    //  fullName: null,
    //  userName: null,
    //  profileAddress: null,
    //  pictureAddress: null
    //};
  };

  // === Events === //
  this.on('update', () => {
    log('Update triggered: ', this);
  });

  this.on('mount', () => {
  //  this.setInitialState();

//this.mixin('Animation');
//this.animate({});
  });

  this.on('unmount', () => {
  });

};

const Application = riot.tag('app', componentTemplate, componentHandler);

module.exports = Application;
