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
	
	var jQueryFuncMap = game.makeFnMap($);
	var funcName = Object.keys(jQueryFuncMap);
	var funcIndex = -1;
	var sourceIndex = -1;
	var sourceEl = $('#source');
	var startButton = $('#startButton');
	var typedSource = $('#typed-source');
	
	function getNextSourceLine() {
		sourceIndex++;
		
		if (sourceIndex > jQueryFuncMap[funcName[funcIndex]].length) {
			funcIndex++;
			sourceIndex = 0;
		}
		
		return jQueryFuncMap[funcName[funcIndex]][sourceIndex];
	}
	
	// Initialize
	funcIndex = 0;
	startButton.click(function () {
		sourceEl.val(getNextSourceLine().trim());
	});

});