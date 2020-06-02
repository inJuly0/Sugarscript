import Type = require("./nodetype");
import Token from "../Lexer/token";
import TokType = require("../Lexer/tokentype");

class ASTNode {
  firstToken: Token;
  start: number;
  end: number;
  kind: Type;
  constructor(kind: Type, start?: number, end?: number) {
    this.start = start || -1;
    this.end = end || -1;
    this.kind = kind;
  }

  static binaryExpr(left: ASTNode, op: Token, right: ASTNode): BinaryExpr {
    return new BinaryExpr(left, op, right);
  }

  static unaryExpr(op: Token, operand: ASTNode) {
    return new UnaryExpr(op, operand);
  }

  static identifier(tok: Token) {
    return new Identifier(tok);
  }

  static literal(tok: Token) {
    return new Literal(tok);
  }

  static groupingExpr(expr: ASTNode){
    return new GroupingExpr(expr);
  }

  static program() {
    return new Program();
  }
}

class BinaryExpr extends ASTNode {
  left: ASTNode;
  op: Token;
  right: ASTNode;
  constructor(left: ASTNode, op: Token, right: ASTNode) {
    super(Type.BinaryExpr);
    this.left = left;
    this.op = op;
    this.right = right;
  }
}

class UnaryExpr extends ASTNode {
  op: Token;
  operand: ASTNode;

  constructor(op: Token, operand: ASTNode) {
    super(Type.UnaryExpr);
    this.op = op;
    this.operand = operand;
  }
}

class Identifier extends ASTNode {
  token: Token;
  name: string;
  constructor(token: Token) {
    super(Type.Identifier, token.start, token.end);
  }
}

class Literal extends ASTNode {
  token: Token;
  value: string | number;
  constructor(token: Token) {
    super(Type.Literal, token.start, token.end);
    this.value = token.value;
  }
}

class GroupingExpr extends ASTNode{
  expression: ASTNode;
  constructor(expr: ASTNode){
    super(Type.GroupingExpr);
    this.expression = expr;
  }
}

class Program extends ASTNode {
  statements: ASTNode[];
  constructor() {
    super(Type.Program);
    this.statements = [];
  }
}



export = ASTNode;
