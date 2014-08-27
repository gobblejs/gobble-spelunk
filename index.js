var tosource = require( 'tosource' );

module.exports = function ( inputDir, outputDir, options, done, err ) {
	require( 'spelunk' )( inputDir, function ( error, result ) {
		var stringify = stringifiers[ options.type || 'json' ];

		if ( !options.dest ) {
			error = 'You must specify a `dest` property for the gobble-spelunk transform';
		}

		if ( !stringify ) {
			error = 'You must specify a `type` property for the gobble-spelunk plugin. Supported types are ' + Object.keys( stringifiers );
		}

		if ( error ) return err( error );

		require( 'gobble' ).file.write( outputDir, options.dest, stringify( result ) ).then( done, err );
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
