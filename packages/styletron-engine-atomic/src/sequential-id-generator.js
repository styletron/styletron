// @flow strict

export default class SequentialIDGenerator {
  prefix: string;
  count: number;
  offset: number;
  msb: number;
  power: number;

  constructor(prefix: string = "") {
    this.prefix = prefix;
    this.count = 0;
    this.offset = 10; // skip ids "1" through "9"
    this.msb = 35;
    this.power = 1;
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
