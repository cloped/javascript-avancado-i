class ProxyFactory {
  static create(object, props, action) {
    return new Proxy(object, {
      get(target, prop, receiver) {
        if (props.indexOf(prop) !== -1 && typeof (target[prop]) === typeof (Function)) {
          return function () {
            // eslint-disable-next-line prefer-rest-params
            Reflect.apply(target[prop], target, arguments);
            return action(target);
          };
        }
        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        if (props.includes(prop)) {
          target[prop] = value;
          action(target);
        }
        return Reflect.set(target, prop, value, receiver);
      },
    });
  }
}

export default ProxyFactory;
