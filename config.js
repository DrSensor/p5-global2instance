module.exports = {
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
  },
  instance: '$_p'
}
