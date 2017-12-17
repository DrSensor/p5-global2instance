const esprima = require('esprima')
const escodegen = require('escodegen')
const esquery = require('esquery')
const estemplate = require('estemplate')

const { p5scopeFuncs, p5exprs } = require('./list-p5func')
const opts = require('./config')

const ast2code = ast => escodegen.generate(ast, opts.escodegen).code
const code2ast = code => esprima.parseModule(code, opts.esprima)

function printAST (ast) {
  const asts = estemplate('%= body%', { body: ast })
  console.log(ast2code(asts))
}


function wrapP5Scope (ast) {
  let code = ast2code(ast)
  for (const func of p5exprs) {
    code = code.replace(new RegExp(func, 'g'), `sketch.${func}`)
  }
  return code2ast(code)
}


function wrapP5Func (ast) {
  if (!['VariableDeclaration', 'FunctionDeclaration'].includes(ast.type)) {
    throw Error(`wrong type ${ast.type}`)
  }

  const name = ast.id ? ast.id.name : ast.declarations[0].id.name
  const expr = ast.id ? ast : ast.declarations[0].init

  if (p5scopeFuncs.includes(name)) {
    expr.id.name = null
    ast = estemplate(`sketch.${name} = <%= expr%>`, {
      expr: expr
    })
  }
  return wrapP5Scope(ast)
}
const wrapP5Funcs = ASTs => ASTs.map(wrapP5Func)

module.exports = function (sourceCode) {
  const templateCode = `
  import p5 from 'p5'
  
  export default function (sketch) {
    %= p5Main %
  }
  `

  // https://github.com/estools/estemplate#advanced-generation-with-source-map
  const template = estemplate.compile(templateCode)
  const source = esprima.parseModule(sourceCode, opts.esprima)

  let vars = esquery(source, 'VariableDeclaration')
  let funcs = esquery(source, 'FunctionDeclaration')
  let ast = template({
    p5Main: vars.concat(wrapP5Funcs(funcs))
  })
  const output = escodegen.generate(ast, opts.escodegen)
  return output.code
}
