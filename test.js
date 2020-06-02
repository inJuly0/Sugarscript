const fs = require('fs')
const util = require('util')
const lex = require('./dist/Lexer/lexer')
const parse = require('./dist/Parser/parser')

const testDir = './test/expressions'

fs.readdir(testDir, (err, files) => {
    files.forEach(file => {
        fs.readFile(testDir + '/' + file, {
            encoding: 'utf-8'
        }, (err, data) => {
            // const tokens  = lex(data);
            // const ast = parse(tokens);
            // const js = compile(ast);
            // console.log(js);
            // eval(js)
            const ast = parse(lex(data))
            console.log(util.inspect(ast, {depth: null, colors: true}))
        });
    });
});