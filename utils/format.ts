import { stringify } from 'qs';

/**
 * @description 四舍五入， 并保留指定有效位数
 * @param {number} 处理的数字
 * @param {number} digit 保留小数位数
 */

export const formatRound: (num: number, digit?: number) => number = (
  num,
  digit = 2,
) => {
  return Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit);
};

/**
 * @description 随机范围数字
 */
export const randomNumber: (min: number, max?: number) => number = (
  min = 0,
  max = 100,
) => {
  return Math.round(Math.random() * (max - min) + min);
};

/**
 *  @description 字符串数字 / 数字 加上千分符
 */

export const addCommas: (str: string) => string = (str) => {
  let [integerPart, decimalPart] = str.toString().split('.');
  const reg = /(\d+)(\d{3})/;
  while (reg.test(integerPart)) {
    integerPart = integerPart.replace(reg, '$1' + ',' + '$2');
  }
  return `${integerPart}${decimalPart === undefined ? '' : '.' + decimalPart}`;
};

/**
 *  @description 对象转 url query
 */
export const queryParams: (
  params: { [key: string]: any } | undefined,
) => string = (params) => {
  try {
    return Object.keys(params || {}).length > 0 ? `?${stringify(params)}` : ``;
  } catch (err) {
    return ``;
  }
};

// 上传文件的预览地址
export const readPreviewUrl: (file: File) => void = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// 数字精度问题
export const strip = (num: number, precision: number = 12): number =>
  +parseFloat(num.toPrecision(precision));
