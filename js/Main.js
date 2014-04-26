require.config({
	baseUrl: 'js/',
	paths: {
		Q: 'vendor/q/q',
		jquery: 'vendor/jquery/jquery',
		esprima: 'vendor/esprima/esprima',
		escodegen: 'vendor/escodegen/escodegen'
	}
});

require(['jquery', 'esprima', 'escodegen', 'Game'], function (jquery, esprima, escodegen, game) {
	// escodegen has issues with AMD loading
	escodegen = window.escodegen;
	
	 var jQueryFuncMap = game.makeFnMap($, function filterFn(item, index) { return item.trim().length > 5; }),
		 funcName = Object.keys(jQueryFuncMap),
		 funcIndex = -1,
		 sourceIndex = -1,
		 displayedSource = $('#source'),
		 startButton = $('#startButton'),
		 typedSource = $('#typed-source');
	
	// TODO: Handle End of game.
	function getNextSourceLine() {
		sourceIndex++;
		
		if (sourceIndex >= jQueryFuncMap[funcName[funcIndex]].length) {
			funcIndex++;
			sourceIndex = 0;
		}
		console.log("(", jQueryFuncMap[funcName[funcIndex]][sourceIndex], ")");
		return jQueryFuncMap[funcName[funcIndex]][sourceIndex];
	}
	
	funcIndex = 0;
	
	// Start the game
	// TODO: Code cleanup by adding functions to render errors and clear boxes
	startButton.one('click', function () {
		typedSource.keyup(function (data) {
			// TODO: Highlight errors
			console.log("(", typedSource.val(), ")", "(", displayedSource.text(), ")");
			if (typedSource.val() === displayedSource.text()) {
				getNextSourceLine();
				displayedSource.html(getNextSourceLine().trim());
				typedSource.val("");
			}
		});
		
		displayedSource.html(getNextSourceLine().trim());
		
		$('html').click(function () {typedSource.focus();});
	});

});






