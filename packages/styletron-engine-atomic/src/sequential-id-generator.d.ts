export default class SequentialIDGenerator {
    prefix: string;
    count: number;
    offset: number;
    msb: number;
    power: number;
    constructor(prefix?: string);
    next(): string;
    increment(): number;
}
