ICAL.Alarm = (function() {

  function Alarm(component, options) {
    if (!(component instanceof ICAL.Component)) {
      options = component;
      component = null;
    }

    if (component) {
      this.component = component;
    } else {
      this.component = new ICAL.Component('valarm');
    }
  }

  Alarm.prototype = {

    get description() {
      return this._firstProp('description');
    },

    set description(value) {
      this._setProp('description', value);
    },

    get trigger() {
      return this._firstProp('trigger');
    },

    set trigger(value) {
      this._setProp('trigger', value);
    },

    get action() {
      return this._firstProp('action');
    },

    set action(value) {
      this._setProp('action', value);
    },

    get summary() {
      return this._firstProp('summary');
    },

    set summary(value) {
      this._setProp('summary', value);
    },

    _setProp: function(name, value) {
      this.component.updatePropertyWithValue(name, value);
    },

    _firstProp: function(name) {
      return this.component.getFirstPropertyValue(name);
    },

    toString: function() {
      return this.component.toString();
    }

  };

  return Alarm;

}());
