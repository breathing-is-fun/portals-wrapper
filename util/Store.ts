export default class Store {
  private name: string | null;
  constructor(name: string, defaults?: any) {
    this.name = name;

    if (defaults !== undefined) {
      for (let key in defaults) {
        if (defaults.hasOwnProperty(key) && this.get(key) === undefined) {
          this.set(key, defaults[key]);
        }
      }
    }
  }

  get = (propsName: string | null) => {
    let name = 'store.' + this.name + '.' + propsName;

    if (localStorage.getItem(name) === null) {
      return undefined;
    }

    try {
      return JSON.parse(localStorage.getItem(name) as any);
    } catch (e) {
      return null;
    }
  };

  set = (name: string, value: string | number | null) => {
    if (value === undefined) {
      this.remove(name);
    } else {
      if (typeof value === 'function') {
        value = null;
      } else {
        try {
          value = JSON.stringify(value);
        } catch (e) {
          value = null;
        }
      }

      localStorage.setItem('store.' + this.name + '.' + name, value as any);
    }

    return this;
  };

  remove = (name: string) => {
    localStorage.removeItem('store.' + this.name + '.' + name);

    return this;
  };

  removeAll = () => {
    let name = 'store.' + this.name + '.';

    for (let i = localStorage.length - 1; i >= 0; i--) {
      if ((localStorage.key(i) as any).substring(0, name.length) === name) {
        localStorage.removeItem(localStorage.key(i) as any);
      }
    }

    return this;
  };

  toObject = () => {
    let values = {},
      key,
      value;

    let name = 'store.' + this.name + '.';

    for (let i = localStorage.length - 1; i >= 0; i--) {
      if ((localStorage.key(i) as any).substring(0, name.length) === name) {
        key = (localStorage.key(i) as any).substring(name.length);
        value = this.get(key);
        if (value !== undefined) {
          values[key] = value;
        }
      }
    }

    return values;
  };

  fromObject = (values: any, merge: any) => {
    if (merge !== true) {
      this.removeAll();
    }
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        this.set(key, values[key]);
      }
    }

    return this;
  };
}
