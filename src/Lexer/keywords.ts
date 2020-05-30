import TokType = require("./tokentype");

const keywords = Object.freeze({
  or: TokType.OR,
  and: TokType.AND,
  break: TokType.BREAK,
  if: TokType.IF,
  else: TokType.ELSE,
  elif: TokType.ELIF,
  true: TokType.TRUE,
  false: TokType.FALSE,
  func: TokType.FUNC,
  in: TokType.IN,
  for: TokType.FOR,
  do: TokType.DO,
  while: TokType.WHILE,
  const: TokType.CONST,
  enum: TokType.ENUM,
  var: TokType.VAR,
  string: TokType.STRING,
  num: TokType.NUM,
  bool: TokType.BOOL,
  nil: TokType.NIL,
  void: TokType.VOID,
  set: TokType.SET,
  get: TokType.GET,
  pass: TokType.PASS,
  import: TokType.IMPORT, 
  export: TokType.EXPORT
});

export = keywords;
