#!/usr/bin/env node
const fs = require('fs')
const { join } = require('path')
const { URL } = require('url')

const program = require('commander')
const convert = require('./index')

program
  .arguments('[file]')
  .option('-o, --output [file]', 'Save output file to [file]')
  .option('-p, --print', 'Print result to stdout')
  .action(function (file) {
    const url = file => new URL(join('file://', join(__dirname, file)))
    const sourceCode = fs.readFileSync(url(file), 'utf8')

    const output = convert(sourceCode)

    if (program.output) {
      let outFile = program.output.length > 0 ? `${program.output}.p5.js` : url(`instanceof-${file}`)
      if (program.output.length > 0) outFile = program.output.includes('.p5.js') ? program.output : outFile
      fs.writeFileSync(outFile, output, 'utf-8')
      console.log(`=> save to ${outFile}`)
    } else console.log(output)
    if (program.print) console.log(output)
  })
  .parse(process.argv)
