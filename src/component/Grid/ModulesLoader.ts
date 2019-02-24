// import { fetch } from 'whatwg-fetch';

const importPolyfill = (url: string) => {
  if (!url) {
    console.error('importPolyfill error: url is undefined.');
    return;
  }

  const promise = fetch(url)
    .then(reponse => reponse.text())
    .then(text => {
      const module = { exports: {} };
      const generate = new Function('module', text);

      generate(module);

      return module.exports;
    })
    .catch(error => console.error('importPolyfill error: ' + error));

  return promise;
};

export default class ModulesLoader {
  private layout: Array<any>;
  private roots: any;

  constructor(layout: Array<any>, roots: any) {
    this.layout = layout;
    this.roots = roots;
  }

  load = (tool: any) => {
    let pathArr = [],
      newLayout = [];

    for (let item of this.layout) {
      const { path, moduletype: type } = item;

      if (type != 'iframe') {
        pathArr.push(importPolyfill(path));
        newLayout.push(item);
      }
    }

    this.layout = newLayout;
    this.loadScripts(pathArr, 0, [], (modules: Array<any>) => {
      for (let i = 0; i < modules.length; i++) {
        let TargetModule = modules[i];

        if (!TargetModule) {
          continue;
        }

        try {
          const { i: key } = this.layout[i];

          if ('default' in TargetModule) {
            TargetModule = TargetModule.default;
          }

          const loadedModule = new TargetModule(this.roots[key], tool);
          const { _moduleOnMount } = loadedModule;

          _moduleOnMount && _moduleOnMount.call(loadedModule);
        } catch (error) {
          console.warn('Ignored error => ' + error);
        }
      }
    });
  };

  loadScripts = (
    pathArr: Array<any>,
    index = 0,
    importedModules: Array<any> = [],
    callback: (importedModules: Array<any>) => void,
  ) => {
    if (index != pathArr.length) {
      pathArr[index]
        .then((importModule: any) => {
          importedModules.push(importModule);
          this.loadScripts(pathArr, ++index, importedModules, callback);
        })
        .catch((error: any) => console.error('loadScripts error: ' + error));
    } else {
      callback && callback(importedModules);
    }
  };
}
