function EventManager() {
  if (!(this instanceof EventManager)) {
    console.warn("An EventManager should only be constructed with the \'new\' keyword.");
    console.warn("No EventManager was constructed.");
    return;
  }
  this._events = {};
}

EventManager.prototype.subscribe = function(id, type, callback) {
  this._events[type] = this._events[type] || {};
  this._events[type][id] = callback;
  return this.unsubscribe.bind(this, id);
};

EventManager.prototype.unsubscribe = function(id) {
  for(var type in this._events){
    for(var key in this._events[type]){
      if(key === id){
        delete this._events[type][key];
      }
    }
  }
};

EventManager.prototype.suppressEvent = function(type) {
  if(this._events[type]){
    this._events[type].SUPPRESSED = true;
  }
};

EventManager.prototype.unsuppressEvent = function(type) {
  if (this._events[type]) {
    this._events[type].SUPPRESSED = false;
  }
};

EventManager.prototype.raiseEvent = function(type, payload) {
  if(this._events[type] && !this._events[type].SUPPRESSED){
    for (var listener in this._events[type]) {
        this._events[type][listener](payload);
    }
  }
};

Object.defineProperties(EventManager.prototype, {
  events: {
    get: function(){
      return this._events;
    }
  },
  registeredTypes: {
    get: function(){
      return Object.keys(this._events);
    }
  }
});

module.exports = EventManager;
