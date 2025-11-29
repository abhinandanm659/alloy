/**
 * ALLOY v0.0.1
 */

export class Alloy{


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


  /**
   * Static Initializer
   * Allows usage like: Alloy.from(users)
   */
  static from(data) {
    return new Alloy(data);
  }

   /**
   * Debug method to see what we are holding.
   */
  inspect() {
    return this._data;
  }
}
