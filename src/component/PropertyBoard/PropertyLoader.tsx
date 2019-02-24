// 获得style中文枚举
export default class PropertyLoader {
  load = (
    enumDatas: Array<any>,
    style = {},
    key: string,
    callback: (propertyDatas: any) => void,
  ) => {
    const propertyDatas = this.hanldePropertyEnum(style, enumDatas, key);
    callback && callback(propertyDatas);
  };

  hanldePropertyEnum = (
    style: any,
    enumDatas: Array<any>,
    id: string | number,
  ) => {
    let result = [];
    const styleKeys = Object.keys(style);

    for (let styleKey of styleKeys) {
      for (let item of enumDatas) {
        const { text, key, isStyle = true } = item;

        if (key == styleKey) {
          result.push({
            text,
            key,
            isStyle,
            value: style[styleKey],
            id,
          });
        }
      }
    }

    return result;
  };
}
