var path = require( 'path' );
var fs = require( 'fs' );
var tosource = require( 'tosource' );
var _spelunk = require( 'spelunk' );

module.exports = function spelunk ( inputdir, outputdir, options, callback ) {
	var stringify = stringifiers[ options.type || 'json' ];

	if ( !options.dest ) {
		throw new Error( 'You must specify a `dest` property for the gobble-spelunk transform' );
	}

	if ( !stringify ) {
		throw new Error( 'You must specify a `type` property for the gobble-spelunk plugin. Supported types are ' + Object.keys( stringifiers ) );
	}

	if ( options.spelunk ) {
		console.log( 'options.spelunk is deprecated - `exclude` and other options are passed straight through to spelunk' );
	}

	_spelunk( inputdir, options.spelunk || options ).then( function ( result ) {
		fs.writeFile( path.join( outputdir, options.dest ), stringify( result, options ), callback );
	});
};

var stringifiers = {
	json: function ( result, options ) {
		return JSON.stringify( result, options.replacer, options.space );
	},

	amd: function ( result ) {
		return 'define(function(){return ' + tosource( result ) + ';});';
	},

	cjs: function ( result ) {
		return 'module.exports = ' + tosource( result ) + ';';
	},

	es6: function ( result ) {
		return 'export default (' + tosource( result ) + ');';
	}
};
