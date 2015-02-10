var tosource = require( 'tosource' );

module.exports = function ( inputdir, outputdir, options ) {
	return require( 'spelunk' )( inputdir, options ).then( function ( result ) {
		var stringify = stringifiers[ options.type || 'json' ];

		if ( !options.dest ) {
			throw new Error( 'You must specify a `dest` property for the gobble-spelunk transform' );
		}

		if ( !stringify ) {
			throw new Error( 'You must specify a `type` property for the gobble-spelunk plugin. Supported types are ' + Object.keys( stringifiers ) );
		}

		return require( 'sander' ).writeFile( outputdir, options.dest, stringify( result, options ) );
	});
};

var stringifiers = {
	json: function ( result, options ) {
		return JSON.stringify( result, options.replacer, options.space );
	},

	amd: function ( result, options ) {
		return 'define(function(){return ' + tosource( result ) + ';});';
	},

	cjs: function ( result, options ) {
		return 'module.exports = ' + tosource( result ) + ';';
	},

	es6: function ( result, options ) {
		return 'export default ' + tosource( result ) + ';';
	}
};
