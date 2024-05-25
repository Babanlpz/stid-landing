// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
export class Emitter {
    constructor() {
      // Map of string containing a list of callback
      this._emitterEvents = new Map();
    }
  
    on(eventName, callback) {
      if (!this._emitterEvents.has(eventName)) {
        this._emitterEvents.set(eventName, new Map());
      }
  
      this._emitterEvents.get(eventName).set(Symbol(), callback);
  
      return this;
    }
  
    /**
     * Trigger the callbacks registered for a given event
     */
    emit(eventName, datas) {
      const eventList = Array.isArray(eventName) ? eventName : [eventName];
  
      eventList.forEach((name) => {
        if (this._emitterEvents.has(name)) {
          this._emitterEvents.get(name).forEach((callback) => {
            callback.call(this, datas);
          });
        }
      });
  
      return this;
    }
  
    /**
     * Register a callback for an event that will be triggered once.
     */
    once(eventName, callback) {
      const onceCallback = (e) => {
        callback.call(this, e);
        this.off(eventName, onceCallback);
      };
      this.on(eventName, onceCallback);
  
      return this;
    }
  
    /**
     * Register a callback for an event that will be triggered once and resolve through a Promise
     */
    oncePromise(eventName) {
      return new Promise((resolve) => {
        this.once(eventName, (event) => {
          resolve(event);
        });
      });
    }
  
    /**
     * Unregister a callback from an event
     */
    off(eventName, callback) {
      if (!this._emitterEvents.has(eventName)) return null;
  
      this._emitterEvents.get(eventName).forEach((c, i) => {
        if (c === callback) {
          this._emitterEvents.get(eventName).delete(i);
        }
      });
  
      return this;
    }
  
    /**
     * Alias for `on`
     */
    addEventListener(eventName, callback) {
      return this.on(eventName, callback);
    }
  
    /**
     * Alias for `off`
     */
    removeEventListener(eventName, callback) {
      return this.off(eventName, callback);
    }
  }
  