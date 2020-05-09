interface Token{
  raw: string,
  type: TokType,
  value: null|string|number,
  line: number,
  start: number,
  end: number
}


enum TokType {
  // tokens users can't see
  EOF,

  //single character tokens :
  L_PAREN,
  R_PAREN,
  L_BRACE,
  R_BRACE,
  L_SQ_BRACE,
  R_SQ_BRACE,

  // comparison operatos
  EQ_EQ,
  BANG_EQ,
  GREATER_EQ,
  LESS_EQ,
  GREATER,
  LESS,

  // assignment and compund assignment operators
  EQ,
  STAR_EQ,
  MINUS_EQ,
  PLUS_EQ,
  DIV_EQ,
  MOD_EQ,
  POW_EQ,

  // binary and unary operators
  PLUS,
  MINUS,
  PLUS_PLUS,
  MINUS_MINUS,
  STAR,
  POW,
  MOD,
  DIV,
  BANG,
  POUND,
  NOT,

  // Keywords
  OR,
  AND,
  BREAK,
  IF,
  ELSE,
  ELIF,
  TRUE,
  FALSE,
  FUNC,
  IN,
  FOR,
  LET,
  CONST,
  DO,
  WHILE,
  ENUM,
  CLASS,

  // types : (these are also keywords)
  STRING,
  NUM,
  BOOL,
  NIL,
  //LITERALS

  LITERAL_NUM,
  LITERAL_STR,

  // others
  NAME
}
