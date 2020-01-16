// @flow

export default class SequentialIDGenerator {
  prefix: string;
  count: number;
  offset: number;
  msb: number;
  power: number;

  constructor(prefix: string = "") {
    // ensure start with "ae" so "ad" is never produced
    this.prefix = prefix;
    this.count = 0;
    this.offset = 374;
    this.msb = 1295;
    this.power = 2;
  }

  next() {
    const id = this.increment().toString(36);
    return this.prefix ? `${this.prefix}${id}` : id;
  }

  increment() {
    const id = this.count + this.offset;
    if (id === this.msb) {
      this.offset += (this.msb + 1) * 9;
      this.msb = Math.pow(36, ++this.power) - 1;
    }
    this.count++;
    return id;
  }
}
