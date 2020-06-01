# Precedence :

     or
     and
     <     >     <=    >=    ~=    ==
     ..
     +     -
     *     /     %
     not   #     - (unary)


# Grammar:

Program -> *Statement
Statement -> VarDecl | FuncDecl | ClassDecl | FunctionCall | LoopStmt | ifStmt | ReturnStmt
VarDecl -> ('let'|'const') NAME *('=' expr)
NAME -> a..z *(a..z | 0..9 | '_')

expr -> assignment
assignment ->  or (assignOp assignment)

or -> and *('or' and)
and -> equality *('and' equality)

equality -> cmp *(eqOp cmp)
eqOp -> '==' | '!=' | '~=

cmp -> add *(cmpOp add)
cmpOp -> '>=' | '<' | '>' | '>='

add -> mult *(('+' | '-') add) 
mult -> pow *(('+' | '-') mult)

pow -> unary *('^' unary)
unary -> ('!' | '*' | '#') unary | call
call ->  'new'? memexpr *('(' args? ')')
args -> exp *(',' exp)
memexpr -> primary *('.' NAME | '[' (STRING|NUMBER|NAME) ']')
primary -> NUMBER | STRING | 'true' | 'false' | 'nil' | '(' expr ')' | NAME
