define(
  'ephox.porkbun.Events',

  [
    'ephox.wrap.D'
  ],

  function (D) {
    var create = function (typeDefs) {
      var registry = {};
      var trigger = {};

      D(typeDefs).each(function (struct, type) {
        var handlers = [];

        var bind = function (handler) {
          if (handler === undefined) {
            throw 'Event bind error: undefined handler bound for event type "' + type + '"';
          }
          handlers.push(handler);
        };

        var unbind = function (handler) {
          var index = handlers.indexOf(handler);
          if (index !== -1) {
            handlers.splice(index, 1);
          }
        };

        registry[type] = {
          bind: bind,
          unbind: unbind
        };

        trigger[type] = function (/* fields */) {
          var fields = Array.prototype.slice.call(arguments);
          D(handlers).each(function (handler) {
            try {
              var event = struct.apply(null, fields);
            } catch (e) {
              throw 'Unable to create struct for event type "' + type + '": ' + e;
            }
            handler(event);
          });
        };
      });

      return {
        registry: registry,
        trigger: trigger
      };
    };

    return {
      create: create
    };
  }
);
