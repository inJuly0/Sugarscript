import Type = require("./nodetype");

const ASTNode = {
  [Type.BinaryExpr]: function () {
    return node({
      left: null,
      right: null,
      op: null,
      kind: Type.BinaryExpr,
    });
  },
  [Type.PreUnaryExpr]: function () {
    return node({
      op: null,
      operand: null,
    });
  },
};

function node(astNode) {
  astNode.sourceInfo = {
    start: -1,
    end: -1,
  };
  return astNode
}

export = ASTNode
