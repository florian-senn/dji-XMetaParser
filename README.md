# DJI XMP Metadata Parser

[![Build Status](https://travis-ci.com/florian-senn/dji-XMetaParser.svg?branch=master)](https://travis-ci.com/florian-senn/dji-XMetaParser.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/florian-senn/dji-XMetaParser/badge.svg?branch=master)](https://coveralls.io/github/florian-senn/dji-XMetaParser?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**Get the most out of your DJI Footage** ✨

Swiss tool for extracting XMP metadata from DJI drones.

# Features

Right now, it takes some text-input and parses the attributes of `<rdf:Description/>`
You care about loading the image/jpg, XMetaParser does the rest.

Promise-based.

# Example
    
    import { parseText } from 'dji-xmetaparser'
    fetch('link/to/your.jpg')
        .then(response => response.blob())
        .then(blob => blob.text())
        .then(text => parseText(text))
        .then(metadata => {
            console.log(metadata)
        })
        .catch()
        .finally()

# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with standard-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

# Installation

- `yarn add dji-xmetaparser`
- `npm i dji-xmetaparser --save`


# License

MIT © Florian Senn

# Thanks

- [Dinesh Pandiyan](https://github.com/flexdinesh) for [NPM Module Boilerplate](https://github.com/flexdinesh/npm-module-boilerplate)
