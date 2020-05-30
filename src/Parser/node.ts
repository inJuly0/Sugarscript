import Type = require("./nodetype");

const ASTNode = {
  [Type.BinaryExpr] : function() {
    return {
      left: null,
      right: null,
      op: null,
      kind: Type.BinaryExpr,
    };
  },

};
