var tosource = require( 'tosource' );

module.exports = function ( inputDir, outputDir, options, done ) {
	require( 'spelunk' )( inputDir, function ( err, result ) {
		var stringify = stringifiers[ options.type || 'json' ];

		if ( !options.dest ) {
			err = 'You must specify a `dest` property for the gobble-spelunk transform';
		}

		if ( !stringify ) {
			err = 'You must specify a `type` property for the gobble-spelunk plugin. Supported types are ' + Object.keys( stringifiers );
		}

		if ( err ) return done( err );

		require( 'gobble' ).file.write( outputDir, options.dest, stringify( result ) ).then( done );
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
		return 'export default (' + tosource( result ) + ');';
	}
}
