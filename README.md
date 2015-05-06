# gobble-spelunk

Flatten folders with gobble and [spelunk](https://github.com/rich-harris/spelunk).

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-spelunk
```

## Usage

**gobblefile.js**

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'data' ).transform( 'spelunk', {
  // output format can be `json`, `amd`, `cjs` or `es6`
  type: 'json',

  // the file to create
  dest: 'data.json',

  // JSON-specific options - for more info see
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  replacer: someFunction,
  space: '  '

  // remaining options are passed through to spelunk
  exclude: [ '**/README.md' ],
  keepExtensions: true
});
```


## License

MIT. Copyright 2014 Rich Harris
