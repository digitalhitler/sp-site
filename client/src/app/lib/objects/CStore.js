"use strict";

const riot = window.Riot || require('riot');

const ensureStoreObject = function() {
  if(!window.__ApplicationStores) {
    window.__ApplicationStores = {};
  }
}

const getStoreScope = function() {
  ensureStoreObject();
  return window.__ApplicationStores;
}

class CStore {
  constructor(name) {
    let scope = getStoreScope();
    if(name && typeof name === 'string') {
      if(!CStore.isExists(name)) {
        this.name = name;
        this.available = true;
        this.data = new Map();
        riot.observable(this);
        scope[name] = this;
      } else {
        return scope[name];
      }
    } else {
      throw new TypeError("Can`t create instance of store that has no name");
    }
  }

  get(key) {
    if(this.has(key)) {
      return this.data.get(key);
    }
  }

  has(key) {
    return (this.data && this.available === true && this.data.has(key));
  }

  set(key, val) {
    if(typeof val === 'undefined' && typeof key === 'object') {
      for(let k in key) {
        this.data.set(k, key[k]);
      }
    } else {
      this.data.set(key, val);
    }
  }

  unset(key) {
    if(this.has(key)) {
      this.data.delete(key);
    }
  }

  destroy() {
    let scope = getStoreScope();
    if(this.name) {
      this.available = false;
      this.data.clear();
      this.data = undefined;
      scope[this.name] = undefined;
      delete scope[this.name];
    }
  }

  static isExists(name) {
    let scope = getStoreScope();
    return (scope && scope[name]);
  }
}


module.exports = CStore;
