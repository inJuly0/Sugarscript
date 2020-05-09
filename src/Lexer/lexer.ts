function lex(src: string): Token[] {
  const tokens: Token[] = [];
  let start = 0;
  let current = 0;
  let line = 0;

  function eof(): boolean {
    return current > src.length;
  }

  function next(): string {
    return src.charAt(current++);
  }

  function peek(): string {
    if (current + 1 > src.length) return null;
    return src.charAt(current + 1);
  }

  function peekNext(): string {
    if (current + 1 > src.length) return null;
    return src.charAt(current + 1);
  }

  function isDigit(c: string): boolean {
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
      value: literal ? "" : literal,
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

  return tokens;
}
