"use strict";

/**
 gradient-bg
 Component (tag) for riot.js
 (c) Sergey S Petrenko

 */

const riot = window.Riot || require('riot');
const log  = window.GetDebugger('components:gradientBg') || console.log;

const GradientEngine = require('granim');

const componentTemplate = `<canvas class="gradient-container"><yield></yield></canvas>`

const componentHandler = function GradientBackgroundComponent() {
  this.initialized = false;

  // === Dependencies === //
  this.mixin('Store');

  // === General methods === //
  // this method loads component initial state & manipulates state from any position to scratch point.

  this.initialize = () => {
    if(this.state && this.state.initialized !== true) {

      log(`Initialize => begin`);

      this.setInitialState();

      this.state.instance = new GradientEngine(this.getEngineOptions());
      this.state.canvasContainer = this.root.getElementsByTagName("canvas")[0];

      this.state.initialized = true;
    }
  };

  this.getEngineOptions = () => {
    if(this.state && this.state.initialized === true) {
      return {
        element: this.state.canvasContainer,
        name:    'granim',
        opacity: [1, 1],
        states:  {
          "default-state": {
            gradients: [
              ['#834D9B', '#D04ED6'],
              ['#1CD8D2', '#93EDC7']
            ]
          }
        }
      };
    } else return false;
  };

  this.setInitialState = () => {
    this.state = {
      isAnimating: false,
      initialized:  false,
      currentState: null,
      instance: null,
      gradientStates: {},
      opacity: [1, 1]
    };
  };

  this.loginTabController = () => {
    log(`LoginTabController => begin`);
    $(this.authLoginUsername).focus();
  };


  // === Entry point === //
  this.initialize();

  // === Events === //
  this.on('mount', () => {
    log(`Mount => begin`, this);
    this.handleHashRoute();
  });

  this.on('before-update', () => {
    log(`BeforeUpdate => begin`, this);
  });

  this.on('update', () => {
    log(`Update => begin`, this);
  });

  this.on('unmount', () => {
    log(`Unmount => begin`, this);
  });

};

const GradientBackground = riot.tag('auth-overlay', componentTemplate, componentHandler);

module.exports = GradientBackground;
