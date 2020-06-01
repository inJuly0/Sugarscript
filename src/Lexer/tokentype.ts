

enum TokType {
  // tokens users can't see
  INDENT, 
  DEDENT,
  EOF,

  //single character tokens :
  L_PAREN,
  R_PAREN,
  L_BRACE,
  R_BRACE,
  L_SQ_BRACE,
  R_SQ_BRACE,
  COMMA,
  DOT,
  COLON,
  SEMI_COLON,
  ARROW,
  AT,

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
  FUNC,
  IN,
  FOR,
  LET,
  CONST,
  DO,
  WHILE,
  ENUM,
  CLASS,  
  VAR,
  SET,
  GET,
  INTERFACE,
  PASS,
  IMPORT,
  EXPORT,
              

  // I'll add the type tokens when I work on
  // static type checking in a separate dev branch
  // types : (these are also keywords)
  STRING,
  NUM,
  BOOL,
  VOID,
  NIL,
  //LITERALS

  LITERAL_NUM,
  LITERAL_STR,
  TRUE,
  FALSE,

  // others
  NAME
}

export  = TokType