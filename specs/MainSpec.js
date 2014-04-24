require(['Game', 'esprima', 'escodegen', 'jquery'], function (game, esprima, escodegen, $) {
	
	describe("Game source code initializer", function () {
		var unformattedSource = 'function evalTempl (str, \t\t\tcontext) {\n'
			+ 'return            \t\t\t  str.replace(/\{(.*?)\}/g, function(match,       key) {\n'
			+ 'return \t\t\t           context[key];});}';

		var beautifiedSource = 'function evalTempl(str, context) {\n'
			   + '    return str.replace(/{(.*?)}/g, function (match, key) {\n'
			   + '        return context[key];\n'
			   + '    });\n'
			   +'}';
			
		it("beautifies source code by removing unneeded whitespace and indenting by 4 spaces", function () {
			var ast = esprima.parse(unformattedSource);
			expect(window.escodegen.generate(ast)).toEqual(beautifiedSource);
		});
		
		it("splits source code by newline into a collection of strings", function () {
			expect(game.makeCollection(beautifiedSource).length).toEqual(5);
		});
		
		
		it("sorts the source code collection by string length ascending", function () {
			var i, len, collection = game.makeSortedCollection(beautifiedSource);
			for(i = 0, len = collection.length; i<len-1; i++) {
				expect(collection[i].length <= collection[i+1].length).toBeTruthy();
			}
		});

		it("returns all functions within the jQuery object", function () {
			var fnList;
			fnList = game.getObjectFunctions();
			
			// jQuery should have these functions
			expect(fnList.each).toBeTruthy();
			expect(fnList.noConflict).toBeTruthy();
			
			// Not a function
			expect(fnList.fn).toBeFalsy();
		});
	});
	
	
});
