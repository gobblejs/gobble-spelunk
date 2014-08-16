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
module.exports = gobble( 'data' ).transform( 'spelunk', { dest: 'data.json' });
```


## Source code

```js
module.exports = function ( inputDir, outputDir, options, done ) {
	require( 'spelunk' )( inputDir, function ( err, result ) {
		var json;

		if ( !options.dest ) {
			err = 'You must specify a `dest` property for the gobble-spelunk transform';
		}

		if ( err ) return done( err );

		json = JSON.stringify( result, options.replacer, options.space );
		require( 'gobble' ).file.write( outputDir, options.dest, json ).then( done );
	});
};

```


## License

MIT. Copyright 2014 Rich Harris
