const fs = require('fs')
const { join } = require('path')
const { URL } = require('url')

const program = require('commander')
const esprima = require('esprima')
const escodegen = require('escodegen')
const estemplate = require('estemplate')

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
    // console.log(source)
    let ast = template({
      body: source.body
    })
    console.info(ast)
    const output = escodegen.generate(ast, opts.escodegen)
    console.info(output.code)
  })
  .parse(process.argv)
