import Token from "../Lexer/token";
import TokType = require("../Lexer/tokentype");
import ASTNode = require("./node");

function parse(tokens: [Token]) {
  let current = 0;
  let ast = ASTNode.program();

  function eof() {
    return current >= tokens.length || tokens[current].type == TokType.EOF;
  }

  function next() {
    if (eof()) return null;
    return tokens[current++];
  }

  function prev() {
    return tokens[current - 1];
  }

  function peek(): Token {
    if (eof()) return null;
    return tokens[current];
  }

  function peekNext() {
    if (eof() || current + 1 >= tokens.length) return null;
    return tokens[current + 1];
  }

  function expect(tokType, err) {
    if (!peek() || peek().type != tokType) throw new Error(err);
    return next();
  }

  function check(tokType: TokType): boolean {
    return peek().type === tokType;
  }

  function checkNext(tokType: TokType): boolean {
    if (!peek() || !peekNext()) return false;
    return peekNext().type === tokType;
  }

  function consume(tokType) {
    if (peek() && peek().type == tokType) return next();
  }

  function isLiteral(token) {
    return (
      token.type === TokType.LITERAL_STR ||
      token.type === TokType.LITERAL_NUM ||
      token.type === TokType.FALSE ||
      token.type === TokType.TRUE ||
      token.type === TokType.NIL
    );
  }

  function match(...types: TokType[]): boolean | Token {
    if (eof()) return false;
    for (let type of types) {
      if (peek().type === type) {
        return next();
      }
    }
    return false;
  }

  function expression(): ASTNode {
    return assignment();
  }

  function assignment(): ASTNode {
    let expr = or();
    while (match(TokType.EQ)) {
      expr = ASTNode.binaryExpr(expr, prev(), assignment());
    }
    return expr;
  }

  function or(): ASTNode {
    let expr = and();
    while (match(TokType.AND)) {
      expr = ASTNode.binaryExpr(expr, prev(), and());
    }
    return expr;
  }

  function and(): ASTNode {
    let expr = eq();
    while (match(TokType.AND)) {
      expr = ASTNode.binaryExpr(expr, prev(), eq());
    }
    return expr;
  }

  function eq(): ASTNode {
    let expr = comparison();
    while (match(TokType.BANG_EQ, TokType.EQ_EQ))
      expr = ASTNode.binaryExpr(expr, prev(), comparison());
    return expr;
  }

  function comparison(): ASTNode {
    let expr = add();
    while (
      match(TokType.LESS_EQ, TokType.GREATER_EQ, TokType.LESS, TokType.GREATER)
    )
      expr = ASTNode.binaryExpr(expr, prev(), add());
    return expr;
  }

  function add(): ASTNode {
    let expr = mult();
    while (match(TokType.PLUS, TokType.MINUS))
      expr = ASTNode.binaryExpr(expr, prev(), mult());
    return expr;
  }

  function mult(): ASTNode {
    let expr = unary();
    while (match(TokType.STAR, TokType.DIV, TokType.MOD))
      expr = ASTNode.binaryExpr(expr, prev(), pow());
    return expr;
  }

  function pow(): ASTNode {
    let expr = unary();
    while (match(TokType.POW)) {
      expr = ASTNode.binaryExpr(expr, prev(), unary());
    }
    return expr;
  }

  function unary(): ASTNode {
    if (match(TokType.BANG, TokType.MINUS, TokType.NOT)) {
      let expr = ASTNode.unaryExpr(prev(), unary());
    }
    return primary();
  }

  function primary(): ASTNode {
    if (match(TokType.NAME)) return ASTNode.identifier(prev());
    if (isLiteral(peek())) return ASTNode.literal(next());
  }

  while(!match(TokType.EOF)){
    ast.statements.push(expression())
  }

  return ast
}

export = parse;
