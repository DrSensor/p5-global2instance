const fs = require('fs')
const { join } = require('path')
const { URL } = require('url')

const program = require('commander')
const esprima = require('esprima')
const escodegen = require('escodegen')
const esquery = require('esquery')
const estemplate = require('estemplate')

const { p5scopeFuncs, p5exprs } = require('./list-p5func')

const opts = {
  esprima: {
    range: true,
    loc: true,
    tolerant: true,
    comment: true
  },
  escodegen: {
    format: {
      indent: {
        style: '  ',
        base: 0,
        adjustMultilineComment: true
      },
      newline: '\n',
      space: ' ',
      quotes: 'auto',
      parentheses: true,
      semicolons: false,
      safeConcatenation: true
    },
    sourceMap: true,
    sourceMapWithCode: true,
    comment: false
  }
}

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


program
  .arguments('[file]')
  .option('-o, --output [file]', 'Save output file to [file]')
  .option('-p, --print', 'Print result to stdout')
  .action(function (file) {
    const url = file => new URL(join('file://', join(__dirname, file)))
    const sourceCode = fs.readFileSync(url(file), 'utf8')
    const templateCode = fs.readFileSync(url('template.js'), 'utf8')

    // https://github.com/estools/estemplate#advanced-generation-with-source-map
    const template = estemplate.compile(templateCode)
    const source = esprima.parseModule(sourceCode, opts.esprima)

    let vars = esquery(source, 'VariableDeclaration')
    let funcs = esquery(source, 'FunctionDeclaration')
    wrapP5Scope(funcs[0])
    let ast = template({
      p5Main: vars.concat(wrapP5Funcs(funcs))
    })
    const output = escodegen.generate(ast, opts.escodegen)
    // fs.writeFileSync(url(`instanceof-${file}`), output.code, 'utf-8')
    console.log(output.code)
  })
  .parse(process.argv)
