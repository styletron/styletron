// @flow

export default class SequentialIDGenerator {
  prefix: string;
  count: number;
  offset: number;
  msb: number;
  power: number;

  constructor(prefix: string = "") {
    this.prefix = prefix;
    this.count = 0;
    // ensure we start with a, not 0
    this.offset = 10;
    this.msb = 35;
    this.power = 1;
  }

  next() {
    const id = this.increment().toString(36);
    return this.prefix ? `${this.prefix}${id}` : id;
  }

  increment() {
    const id = this.count + this.offset;
    if (id === 373) {
      // let us skip "ad"
      this.count++;
      return this.increment();
    }
    if (id === this.msb) {
      this.offset += (this.msb + 1) * 9;
      this.msb = Math.pow(36, ++this.power) - 1;
    }
    this.count++;
    return id;
  }
}
