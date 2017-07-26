// Pull in the eventManagerJS module
var eventManager = require("./src/EventManager");

// Create a new instance of the manager
var manager = new eventManager();

// Subscribe to your event, giving a listener id, eventName, and listener function
// The subscribe function returns the unsubscribe function for layer use;
var unsubscribeFn = manager.subscribe("myListener", "eventName", function(payload){
  console.log(payload);
});

// Raise the event by its type name.  This will invoke all its listeners.
manager.raiseEvent("eventName", "first raiseEvent");

// Suppress the event.  This will stop the invokation of listeners when the
// places in your code try to raiseEvent()
manager.suppressEvent("eventName");

// So when you raiseEvent() here, nothing happens
manager.raiseEvent("eventName", "second raiseEvent");

// Now we're ready to unsuppress the event, allowing for invokation of our
// listeners when raiseEvent is called
manager.unsuppressEvent("eventName");

// So when we raiseEvent() here, we now see our listeners get called
manager.raiseEvent("eventName", "third raiseEvent");

// Now we want to unsubscribe from the event type
unsubscribeFn();

// So now when we raiseEvent(), we won't see anything get invoked since all listeners
// have been removed for that eventType
manager.raiseEvent("eventName", "fourth raiseEvent");

// So if we try to log the original listener, we'll see that it's undefined
console.log(manager.events.eventName.myListener);
