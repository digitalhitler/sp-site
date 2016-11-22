/******************************************************************************
 * @project spetrenko.ru                                                      *
 * @description My sweety personal pet-project sources                        *
 * @repository https://github.com/digitalhitler/spetrenko.ru                  *
 *                                                                            *
 * @author Sergey Petrenko <spetrenko@me.com>                                 *
 * @license Creative Commons Attribution-NonCommercial 4.0                    *
 * @licenseUrl  http://creativecommons.org/licenses/by-nc/4.0/                *
 *                                                                            *
 ******************************************************************************/

"use strict";
const riot = window.Riot || require('riot');
const log = require('debug')('app:mixins:animation');
const animationEvents = 'animationend';
const AnimationMixin = {
  init: function() {
    //log(`Animation mixin attached`, arguments);
  },

  animate: function(config) {
    if(!this.animation) {
      this.animation = {};
    }

    // @todo: Wait for event trigger not more than `config.duration`
    //        If timer triggers earlier than `animationend` event,
    //        forcely remove classStart & perform compenent's animationEnd actions.
    //        Also, try to detect duration from DOM-node automatically if nothing specified.
    //        Also, if duration is 0 or false, disable all additional checks.

    this.animation.duration = config.duration || 300;
    if(config.domElement && typeof config.domElement === 'string') {
      config.domElement = $(config.domElement);
    }
    this.animation.element = config.domElement || this.root;
    this.animation.classStart = config.classStart || "animation";
    this.animation.classEnd = config.classEnd || "animationEnd";
    this.animation.after = config.after || false;
    this.trigger('animationBefore');

    if(!SP.DOM.hasClass(this.animation.element, this.animation.classStart)) {
      SP.DOM.addClass(this.animation.element, this.animation.classStart);
    }

    this.animation.resetClasses = () => {
      SP.DOM.deleteClass(this.animation.element, this.animation.classStart);
      SP.DOM.deleteClass(this.animation.element, this.animation.classEnd);
    };

    this.animation.endHandler = (e) => {
      log('animationEnd triggered. \n', this.animation.element, '\nEvent:\n', e);
      this.trigger('animationEnd', e);
      SP.DOM.deleteClass(this.animation.element, this.animation.classStart);
      if(!SP.DOM.hasClass(this.animation.element, this.animation.classEnd)) {
        SP.DOM.addClass(this.animation.element, this.animation.classEnd);
      }
      this.animation.element.removeEventListener('animationend', this.animation.endHandler);
      this.animation.endListener = null;

      if(this.animation.after) {
        switch (typeof this.animation.after) {
          case 'function':
            this.animation.after();
            break;
          case 'string':
            switch (this.animation.after) {
              case 'hide':
                this.animation.element.style.display = 'none';
                break;
              case 'delete':
                document.removeChild(this.animation.element);
                break;
              case 'show':
                this.animation.element.style.display = 'block';
            }
            break;
        } // endswitch
      } // endif

    };

    this.animation.endListener = this.animation.element.addEventListener('animationend', this.animation.endHandler);
  }
};

riot.mixin('Animation', AnimationMixin);

module.exports = AnimationMixin;
