import TokType = require('./tokentype')

export default interface Token {
    raw: string;
    type: TokType;
    value: null | string | number;
    line: number;
    start: number;
    end: number;
}