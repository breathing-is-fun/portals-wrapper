export default class GlobalListener {
  constructor(root) {
    this.listeners = {};
    this.root = root;
    this.meta = {};
  }

  on = (key, callback) => {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }

    this.listeners[key].push(callback);

    return this;
  };

  do = (key, detail) => {
    const listeners = this.listeners[key] || [];

    for (let item of listeners) {
      item(detail);
    }

    return this;
  };

  set = (key, data) => {
    this.meta[key] = data;

    return this;
  };

  getAll = () => {
    return this.meta;
  };

  get = key => {
    return this.meta[key];
  };

  /**
    to get datas if module is not mounted
    usage:
      from:
        listener.set('listenerName', count);
      to:
        componentDidMount = () => {
          if (!listener.isListenerExist('listenerName')) {
            listener.on('listenerName', data => {
              todo();
            });
          }
          const data = listener.get('listenerName');
          listener.do('listenerName', data);
        };
  */
  isListenerExist = name => !!this.listeners[name];
}
