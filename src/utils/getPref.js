// src/utils/getPref.js
import { Prefectures } from './constants/categories/prefectures';

/**
 * 漢字の都道府県名からコード(prefXX)を返す
 * @param {string} name 漢字表記の都道府県名
 * @returns {string} 見つかれば prefCode、なければ空文字
 */
export function getPrefCodeByName(name) {
  if (!name) return '';
  for (const group of Object.values(Prefectures)) {
    if (Object.prototype.hasOwnProperty.call(group, name)) {
      return group[name];
    }
  }
  return '';
}
