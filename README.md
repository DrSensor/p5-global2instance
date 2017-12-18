# p5-global2instance
Convert p5js code/snippet from global to instance mode

## Install

```bash
npm install p5-global2instance
```

## Usage
There are 2 away to use this script.

### CLI

```bash
p5-global2instance sourceCode.js
```

This will produce __file__ `sourceCode.p5.js`.
For more details use `--help`

```bash
node test.js --help

  Usage: test [options] [file]


  Options:

    -o, --output [file]  Save output file to [file]
    -p, --print          Print result to stdout
    -h, --help           output usage information
```

### Import as module

Take this example code

```javascript
const p5Convert = require('p5-global2instance')

const sourceCode = `
var current;
var previous;

function setup () {
  createCanvas(720, 400);
};

function draw () {
  background(0);
};
`

let output = p5Convert(sourceCode)
console.log(output)
```

It will output

```javascript
import p5 from 'p5';
export default function (sketch) {
  var current;
  var previous;

  sketch.setup = function () {
    sketch.createCanvas(720, 400);
  };

  sketch.draw = function () {
    sketch.background(0);
  };
}
```

#### Options

You can also pass [esprima](http://esprima.readthedocs.io/en/latest/syntactic-analysis.html?highlight=configuration) and [escodegen](https://github.com/estools/escodegen/wiki/API) options.

```javascript
p5Convert(sourceCode, {
  esprima: {},
  escodegen: {}
})
```
