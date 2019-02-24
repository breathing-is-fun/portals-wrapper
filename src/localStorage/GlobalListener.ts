export default class GlobalListener {
  private listeners = {};
  private meta = {};

  on = (key: string, callback: any) => {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }

    this.listeners[key].push(callback);

    return this;
  };

  do = (key: string, detail: any) => {
    const listeners = this.listeners[key] || [];

    for (let item of listeners) {
      item(detail);
    }

    return this;
  };

  set = (key: any, data: any) => {
    this.meta[key] = data;

    return this;
  };

  getAll = () => {
    return this.meta;
  };

  get = (key: any) => {
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
  isListenerExist = (name: any) => !!this.listeners[name];
}
