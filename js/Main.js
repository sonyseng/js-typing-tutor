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
	
	var sourceEl = $('#source'),
		typedSourceEl = $('#typed-source'),
		fnList = game.getObjectFunctions();
	
	var source = fnList.each;
	sourceEl.val(source);

	var ast = esprima.parse(source);
	sourceEl.val(ast);

	var	beautifiedSource = escodegen.generate(ast);
	sourceEl.val(beautifiedSource);
	
	sourceEl.val(game.makeSortedCollection(escodegen.generate(esprima.parse(fnList.each)))[10].trim());
	console.log("Funcs ", fnList);
});