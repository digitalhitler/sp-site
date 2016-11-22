"use strict";

const riot = window.Riot || require('riot');

const log = require('debug')('app:mixins:opts-normalizer');
const OptsNormalizerMixin = {
  init: function() {
    return {
      normality: function() {
        return true;
      }
    }
  },

  normalize: {
    bool: function(val, def = false) {
      if(typeof def !== 'boolean') {
        def = false;
      }

      if(typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        if(val === 'true' || val === true || val === '1' || (typeof val === 'number' && val >= 1) ) {
          return true;
        } else if(val === 'false' || val === false || val === '0' || (typeof val ==='number' && val <= 0)) {
          return false;
        } else {
          return def;
        }
      } else {
        return def;
      }
    },

    int: function(val, def = 0) {
      val = parseInt(val);
      if(!isNaN(val)) {
        return val;
      } else {
        def = parseInt(def);
        return (typeof def === 'number' && !isNaN(def) ? def : 0);
      }
    }
  }
};

riot.mixin('OptsNormalizer', OptsNormalizerMixin);

module.exports = OptsNormalizerMixin;

