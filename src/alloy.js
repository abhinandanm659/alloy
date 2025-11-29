/**
 * ALLOY v0.2.0
 */

import { OPS } from './constants.js';
import { Engine } from './engine.js';

export class Alloy {
  _data = [];
  _queue = [];

  constructor(data) {
    if (!Array.isArray(data)) {
      throw new Error('Alloy Error: Input must be an Array.');
    }
    try {
      this._data = structuredClone(data);
    } catch (err) {
      console.warn('Alloy Warning: Falling back to JSON copy.');
      this._data = JSON.parse(JSON.stringify(data));
    }
  }

  static from(data) {
    return new Alloy(data);
  }

  where(predicate) {
    if (typeof predicate !== 'function') {
      throw new Error('Alloy Error: .where() expects a function.');
    }
    this._queue.push({ type: OPS.FILTER, payload: predicate });
    return this;
  }

  select(selector) {
    const isArray = Array.isArray(selector);
    const isFunc = typeof selector === 'function';
    if (!isArray && !isFunc) {
      throw new Error('Alloy Error: .select() expects an Array or Function.');
    }
    this._queue.push({ type: OPS.SELECT, payload: selector });
    return this;
  }

  orderBy(key, direction = 'asc') {
    this._queue.push({ type: OPS.SORT, payload: { key, direction } });
    return this;
  }

  skip(count) {
    this._queue.push({ type: OPS.SKIP, payload: count });
    return this;
  }

  limit(count) {
    this._queue.push({ type: OPS.LIMIT, payload: count });
    return this;
  }

  run() {
    return Engine.execute(this._data, this._queue);
  }

  inspect() {
    return { vault: this._data, queue: this._queue };
  }
}