"use strict";

const riot = window.Riot || require("riot");

const log = require('debug')('app:components:loading');
console.log('pagelo');
const loadingTemplate = `
<div class="page-loadin-state-container">
  Loading<span class="page-loadin-state-dots" id="loadingDots"></span>
  <span class="page-loadin-state-progress">{ this.state.progressString }</span>
  <span class="page-loadin-state-indicator"></span>
</div>
`;

const pageLoadingBundle = function PageLoadingStateComponent() {

  this.setInitialState = () => {
    this.state = {
      visible: false,
      progressString: null,
      dotsString: ""
    };
    this.dom = {
      dots: $("#loadingDots")[0]
    };
  };
  this.setValue = (value) => {
    value = parseInt(value);
    if(!value || isNaN(value)) value = 0;
    console.log(this.root);
  };
  // this.cardTemplate = this.opts.cardTemplate || 'default';
  this.on('update', () => {
    log('Updated: ', this);
  });
  this.on('mount', () => {
    console.log('Loading state indicator mounted');
    this.setInitialState();
    this.dotsTimer = setInterval(() => {
      this.state.dotsString += ".";
      if(this.state.dotsString.length > 3) {
        this.state.dotsString = "";
      }
      this.dom.dots.innerHTML = this.state.dotsString;
    }, 300);
  });
  this.on('unmount', () => {
  });
};

const loadingComponent = riot.tag('loading', loadingTemplate, pageLoadingBundle);

module.exports = loadingComponent;
