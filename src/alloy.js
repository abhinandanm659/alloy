/**
 * ALLOY v0.0.1
 */

const OPS = Object.freeze({
  FILTER: "FILTER",
  SORT: "SORT",
  SELECT: "SELECT"
});

export class Alloy{
  _data = [];
  _queue = [];

  constructor(data){
    if(!Array.isArray(data)){
        throw new Error("Data must be an array");
    }

    try{
        this._data = structuredClone(data);
    }
    catch(e){
        console.log("Structured clone not supported, falling back to JSON methods");
        this._data = JSON.parse(JSON.stringify(data));
    }
  }

  // The BUILDER
  where(predicate){
    if(typeof predicate !== 'function'){
        throw new Error("Predicate must be a function");
    }

    this._queue.push({
        type: OPS.FILTER,
        fn: predicate
    });

    return this;
  }

  // The ENGINE
  run() {
    let result = this._data;
    
    for (const job of this._queue) {
      switch(job.type){
        case OPS.FILTER:
          result = result.filter(job.fn);
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
