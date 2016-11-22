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

const log = window.GetDebugger('components:page-overlay') || console.log;

const componentTemplate = `
<div id="page-overlay" class="{ visible: state.isVisible, hidden: !state.isVisible }"></div>
`;


const componentHandler = function PageOverlayComponent() {

  // === Dependencies === //
  this.mixin('Store');
  this.mixin('Component');

  this.declareComponent;

  // === General methods === //
  // this method loads component initial state & manipulates state from any position to scratch point.

  this.on('mount', () => {
    this.initializeState({
      isAnimating: false,
      storeApplication: this.getStore('Application'),
      store: this.getStore('Application'),
    });
    this.componentStore = this.getStore('Application');
    console.dir(this.componentStore, 'is AWEEEEEEEEEe');
    this.setVisibility(this.state.isVisible || this.opts.visible || null);
    this.setOpacity(this.state.opacity || this.opts.opacity || null);

    log(`Mounted with params:`, this);
  });


  // sets visibility of overlay to (bool: true, false);
  this.setVisibility = (visible = false) => {
    if(typeof visible !== 'boolean') {
      visible = false;
    }

    this.state.isVisible = visible;

    this.applicationStateStore.set({
      'document.overlayVisible': visible
    });
  };

  // sets opacity of overlay to (bool: true, false);
  this.setOpacity = (opacity = 60) => {
    if(typeof opacity !== 'number') {
      opacity = 60;
    }

    this.state.opacity = opacity;

    this.applicationStateStore.set({
      'document.overlayOpacity': opacity
    });
  }

  // === Events === //
  this.on('update', () => {
    log('Update triggered: ', this);
  });


  this.on('unmount', () => {
    this.setVisibility(false);
  });

};

const PageOverlay = riot.tag('page-overlay', componentTemplate, componentHandler);

module.exports = PageOverlay;
