"use strict";

/**
 workspace-switcher
 Component (tag) for riot.js
 Wrapped into SPTools environment.
 Made by Getrix in 2016
 Based on riot-component-template by Sergey Petrenko <spetrenko@me.com>

 https://github.com/digitalhitler/riot-component-template

 */

const riot = window.Riot || require("riot");

const log = require('debug')('app:components:workspace-switcher');


const componentTemplate = `
<nav class="workspace-switcher">
  <ul class="workspace-switcher-buttons" show="{ hasElements }">
    <virtual each="elements">
      <li class="{ active: current }">
        <button>
          <i if="icon" class="{ icon }">
            <ul if="hasPopover">
              <li><i class="material-icons">remove_red_eye</i><span>9</span></li>
              <li><i class="material-icons">comment</i><span>4</span></li>
              <li><i class="material-icons">account_circle</i><span>6</span></li>
            </ul>
          </i>
        </button>
      </li>
    </virtual>
  </ul>
</nav>
`;

const componentHandler = function workspaceSwitcherHandler() {

  // === General methods === //
  /**
   * this method loads component initial state & must properly reset state from any position to scratch point.
   */
  this.setInitialState = () => {
    this.state = {
      visible: false,
    };
    this.dom = {
      body: document.querySelector("body")
    };
  };

  // === Events === //
  this.on('update', () => {
    log('Update triggered: ', this);
  });

  this.on('mount', () => {
    this.setInitialState();
    this.mixin('Animation');
    this.animate({});
  });

  this.on('unmount', () => {
  });
};

const workspaceSwitcher = riot.tag('workspace-switcher', componentTemplate, componentHandler);

module.exports = workspaceSwitcher;
