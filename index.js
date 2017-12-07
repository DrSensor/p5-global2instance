const fs = require('fs')
const { join } = require('path')
const { URL } = require('url')

const program = require('commander')
const esprima = require('esprima')
const escodegen = require('escodegen')
const esquery = require('esquery')
const estemplate = require('estemplate')

const { scopeFunc } = require('./list-p5func')

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


function printAST (ast) {
  const asts = estemplate('%= body%', { body: ast })
  console.log(escodegen.generate(asts, opts.escodegen).code)
}


function wrapP5Func (ast) {
  if (!['VariableDeclaration', 'FunctionDeclaration'].includes(ast.type)) {
    throw Error(`wrong type ${ast.type}`)
  }

  const name = ast.id ? ast.id.name : ast.declarations[0].id.name
  const expr = ast.id ? ast : ast.declarations[0].init

  if (scopeFunc.includes(name)) {
    expr.id.name = null
    return estemplate(`sketch.${name} = <%= expr%>`, {
      expr: expr
    })
  } else return ast
}
const wrapP5Funcs = ASTs => ASTs.map(wrapP5Func)


program
  .arguments('[file]')
  .option('-o, --output [file]', 'Save output file to [file]')
  .action(function (file) {
    const url = file => new URL(join('file://', join(__dirname, file)))
    const sourceCode = fs.readFileSync(url(file), 'utf8')
    const templateCode = fs.readFileSync(url('template.js'), 'utf8')

    // https://github.com/estools/estemplate#advanced-generation-with-source-map
    const template = estemplate.compile(templateCode)
    const source = esprima.parseModule(sourceCode, opts.esprima)

    let vars = esquery(source, 'VariableDeclaration')
    let funcs = esquery(source, 'FunctionDeclaration')
    let ast = template({
      p5Main: vars.concat(wrapP5Funcs(funcs))
    })
    const output = escodegen.generate(ast, opts.escodegen)
    console.log(output.code)
  })
  .parse(process.argv)
