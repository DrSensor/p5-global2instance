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
    
    if (program.print) console.log(output)

    if (program.output) {
      var outFile = program.output.length > 0 ? `${program.output}.p5.js` : url(`${file.replace('.js', '')}.p5.js`)
      if (program.output.length > 0) outFile = program.output.includes('.p5.js') ? program.output : outFile
      if (file.includes('.p5.js') && !program.output.length) outFile = url(`instanceof-${file}`)

      fs.writeFileSync(outFile, output, 'utf-8')
      console.log(`=> save to ${outFile}`)
    } else if (!program.print) console.log(output)
  })
  .parse(process.argv)
