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
