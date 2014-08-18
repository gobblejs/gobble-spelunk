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
module.exports = gobble( 'data' ).transform( 'spelunk', { type: 'json', dest: 'data.json' });
```

The options argument must have a `dest` property, specifying where the result gets written. You can specify the `type` of output as one of `json` (default), `amd`, cjs` or `es6`.

In `json` mode, you can specify `replacer` and `space` options, which are passed to `JSON.stringify()` (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) for an explanation).


## License

MIT. Copyright 2014 Rich Harris
