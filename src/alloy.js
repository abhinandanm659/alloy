/**
 * ALLOY v0.0.1
 */

const OPS = Object.freeze({
  FILTER: "FILTER",
  SORT: "SORT",
  SELECT: "SELECT"
});

export class Alloy {
  _data = [];
  _queue = [];

  constructor(data) {
    if(!Array.isArray(data)){
        throw new Error("Alloy Error : Data must be an array");
    }

    try{
        this._data = structuredClone(data);
    }
    catch(e){
        console.log("Structured clone not supported, falling back to JSON methods");
        this._data = JSON.parse(JSON.stringify(data));
    }
  }

  // ---------- The BUILDER ----------
  where(predicate) {
    if(typeof predicate !== 'function') {
        throw new Error("Predicate must be a function");
    }

    this._queue.push({
        type: OPS.FILTER,
        fn: predicate
    });

    return this;
  }

  /**
   * SELECT (The Projector)
   * 1. If input is Array -> Pick specific keys (SQL style).
   * 2. If input is Function -> Run custom transformation (Map style).
   */
  select(selector) {
    const isArray = Array.isArray(selector);
    const isFunc = typeof selector === 'function';

    if(!isArray && !isFunc) throw new Error('Alloy Error : select() expects an Array of keys or a transformation Function.');

    this._queue.push({
      type: OPS.SELECT,
      payload: selector
    });

    return this;
  }

  // ---------- The ENGINE ----------
  run() {
    let result = this._data;
  
    for (const job of this._queue) {
      switch(job.type) {
        case OPS.FILTER:
          result = result.filter(job.fn);
          break;

        case OPS.SELECT:
          if(typeof job.payload === 'function') {
            result = result.map(job.payload);
          } else {
            const keys = job.payload;
            result = result.map(item => {
              const newObj = {};
              for(const key of keys) {
                if(key in item){
                  newObj[key] = item[key];
                }
              }
              return newObj;
            });
          }
          break;
      }
    }

    return result;
  }

  static from(data) {
    return new Alloy(data);
  }

  inspect() {
    return {
      vault: this._data,
      queueSize: this._queue.length,
      queue: this._queue
    };
  }
}
