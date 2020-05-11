import keywords = require("./keywords");
import TokType = require("./tokentype");
import Token from "./token";

function lex(src: string): Token[] {
  const tokens: Token[] = [];
  let start = 0;
  let current = 0;
  let line = 0;

  function eof(): boolean {
    return current >= src.length;
  }

  function next(): string {
    return src.charAt(current++);
  }

  function peek(): string {
    if (current + 1 > src.length) return null;
    return src.charAt(current);
  }

  function peekNext(): string {
    if (current + 1 > src.length) return null;
    return src.charAt(current + 1);
  }

  function isDigit(c: string): boolean {
    if (!c) return false;
    return c >= "0" && c <= "9";
  }

  function isAlpha(c: string): boolean {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
  }

  function isAlphaNumeric(c: string): boolean {
    return isDigit(c) || isAlpha(c);
  }

  function addToken(type: TokType, literal?: string | number): void {
    const raw = src.substring(start, current);
    const tok = {
      type: type,
      raw: raw,
      value: literal == undefined ? "" : literal,
      line: line,
      start: start,
      end: current,
    };
    tokens.push(tok);
  }

  function lexNumber() {
    while (isDigit(peek())) next();

    if (peek() === "." && isDigit(peekNext())) {
      next();
      while (isDigit(peek())) next();
    }
    let txt = src.substring(start, current);
    addToken(TokType.LITERAL_NUM, parseFloat(txt));
  }

  function lexName() {
    while (isAlphaNumeric(peek())) next();
    let txt = src.substring(start, current);
    let type = TokType.NAME;
    if (txt in keywords) {
      type = keywords[txt];
      addToken(type);
    } else {
      addToken(type, txt);
    }
  }

  function lexString(quote) {
    while (peek() !== quote && !eof()) {
      if (peek() == "\n")
        throw new Error(`Unterminated String literal at line ${line}`);
      if (peek() === "\\") next();
      next();
    }
    if (eof()) throw new Error(`Unterminated String literal at line ${line}`);
    next(); //consume the ending quote
    addToken(TokType.LITERAL_STR, src.substring(start + 1, current - 1));
  }

  function match(expected: string): boolean {
    if (eof()) return false;
    if (src.charAt(current) !== expected) return false;
    current++;
    return true;
  }

  function expect(expected: string): string {
    if (eof()) return null;
    if (src.charAt(current) !== expected)
      throw new Error(`Expected ${expected} at line ${line}`);
    current++;
    return expected;
  }

  function scanToken(c: string) {
    switch (c) {
      case "(":
        addToken(TokType.L_PAREN);
        break;
      case ")":
        addToken(TokType.R_PAREN);
        break;
      case "[":
        addToken(TokType.L_SQ_BRACE);
        break;
      case "]":
        addToken(TokType.R_SQ_BRACE);
        break;
      case "{":
        addToken(TokType.L_BRACE);
        break;
      case "}":
        addToken(TokType.R_BRACE);
        break;
      case ",":
        addToken(TokType.COMMA);
        break;
      case ".":
        addToken(TokType.DOT);
        break;
      case "%":
        addToken(TokType.MOD);
        break;
      case ":":
        addToken(TokType.COLON);
        break;
      case ";":
        addToken(TokType.SEMI_COLON);
        break;
      case "-":
        if (match("=")) addToken(TokType.MINUS_EQ);
        else if (match("-")) addToken(TokType.MINUS_MINUS);
        else if (match(">")) {
          addToken(TokType.ARROW);
        } else addToken(TokType.MINUS);
        break;
      case "+":
        if (match("=")) addToken(TokType.PLUS_EQ);
        else if (match("+")) addToken(TokType.PLUS_PLUS);
        else addToken(TokType.PLUS);
        break;
      case "*":
        if (match("=")) {
          addToken(TokType.STAR_EQ);
        } else {
          addToken(TokType.STAR);
        }
        break;
      case "/":
        if (match("=")) {
          addToken(TokType.DIV_EQ);
        } else if (match("/")) {
          while (!(eof() || match("\n"))) next(); //TODO: modify this later to store comments
          line++;
        } else if (match("*")) {
          while (!eof() && !(peek() == "*" && peekNext() == "/")) {
            if (next() == "\n") line++;
          }
          next(); // consume *
          next(); // consume /
        } else {
          addToken(TokType.DIV);
        }
        break;
      case "=":
        if (match("=")) {
          addToken(TokType.EQ_EQ);
        } else {
          addToken(TokType.EQ);
        }

        break;
      case "!":
        addToken(match("=") ? TokType.BANG_EQ : TokType.BANG);
        break;
      case "<":
        if (match("=")) addToken(TokType.LESS_EQ);
        else addToken(TokType.LESS);
        break;
      case ">":
        addToken(match("=") ? TokType.GREATER_EQ : TokType.GREATER);
        break;
      case "&":
        expect("&");
        addToken(TokType.AND);
        break;
      case "#":
        addToken(TokType.POUND);
        break;
      case "|":
        expect("|");
        addToken(TokType.OR);
        break;
      case " ":
      case "":
      case "\r":
      case "\t":
        // Ignore whitespace.
        break;
      case "\\":
        if (!match("\n")) throw new Error('Unexpected character "\\"');
        next();
        line++;
        break;
      case "\n":
        line++;
        break;
      case '"':
      case "'":
      case "`":
        lexString(c);
        break;
      default:
        if (isDigit(c)) {
          lexNumber();
        } else if (isAlpha(c)) {
          lexName();
        } else {
          throw new Error("Unexpected character " + c + " at line " + line);
        }
        break;
    }
  }

  while (!eof()) {
    start = current;
    let c: string = next();
    scanToken(c);
  }

  return tokens;
}

// test code
let toks = lex("/*comment*/ hello + 1");
console.log(toks);
