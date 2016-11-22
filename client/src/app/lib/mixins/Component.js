"use strict";

const riot = window.Riot || require('riot');
const log = window.GetDebugger('mixins:component') || console.log;

const ComponentMixin = {
  init: function() {
    return true;
  },

  declareComponent: function(name, isSingleton = false) {
    if(!name || typeof name !== 'string' || name ==  "") {
      throw new ReferenceError(`declareComponent: name argument is not string or not defined.`);
      return false;
    }
    this.component = true;
    this.componentName = name;
    this.componentSingleton = (isSingleton === true ? true : false);

    this.prototype.getComponentStore = () => {
      if(!this.getStore || typeof this.getStore === 'function') {
        this.mixin('Store');
      }

      return this.getStore('Component');
    };

    this.prototype.storeComponent = (instance = null) => {
      let storageId, storedInstance, store = this.getComponentStore();
      if(store.has(storageId)) {

      }

      if(instance === null) {
        instance = this;
      }

      if(instance && instance.component === true) {
        storageId = instance.componentName || instance.root.id || instance.root.localName;
        if(storageId && storageId.length > 0) {
          store.set(storageId, instance);
        }
      } else {
        throw new TypeError(`storeComponent: Given instance is not a component.`);
        return false;
      }
    },
  },

  getStoredComponent(storageId) {
    if(!storageId || storageId.length === 0) {

    }
  }

  // ===== STATE WORKFLOW ===== //

  initializeState: function(initialState) {
    this.resetState();
    this.setState(initialState);
    if(typeof this.initialState === 'function') {
      this.setInitialState = initialState;
    }
  },


  setState: function(newState, triggerUpdate = true) {

    let node = this;

    // Check for function passed in first function argument
    if(newState && typeof newState === 'function') {

      // Execute handler:
      let handledResult = newState.call(this);

      // Check is execution failed?
      if(handledResult === false) {
        throw new Error(`Cannot update #${node.id} state: handledResult is ${handledResult}`)
        return false;

      // Or execution just silently done and return true if yes
      } else if(handledResult === true) {
        return true;
      }

      // Check is result object needs to be set as newState due to
      // absolutely same state updating logic
      if(typeof handledResult === 'object') {
        newState = handledResult;
      }
    }

    // Check for presence of state properties that needs to be set up
    // into the component`s state object:
    if(newState && typeof newState === 'object') {

      // Update each newState property of our component`s state
      for(let prop in newState) {

        // Check is current property related with our instance, not with
        // prototype or any parent`s prototypes:
        if(newState.hasOwnProperty(prop)) {

          // Update current state property
          this.state[prop] = newState[prop];
        }
      }
    }

    if(triggerUpdate === true) {
      this.update();
    } else if(typeof triggerUpdate === 'object') {
      this.update(triggerUpdate);
    }

    return true;
  },

  // Hard reset current state
  resetState: function() {
    this.state = {};
  }

    // get tagsFlat() {
    //   var flatTagsArray = [];
    //   var self          = this;
    //   Object.keys(this.tags).forEach(function (key) {
    //     if (Array.isArray(self.tags[key])) {
    //       flatTagsArray = flatTagsArray.concat(self.tags[key]);
    //     } else {
    //       flatTagsArray.push(self.tags[key])
    //     }
    //   })
    //   return flatTagsArray;
    // }

};

riot.mixin('Component', ComponentMixin);

module.exports = ComponentMixin;


этоо
