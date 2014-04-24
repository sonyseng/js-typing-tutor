define(['jquery', 'esprima', 'escodegen'], function ($, esprima, escodegen) {
	function makeCollection(str, sortFn) {
		return sortFn ? str.split(/\r?\n|\r/).sort(sortFn) : str.split(/\r?\n|\r/);
	}

	function makeSortedCollection(str) {
		return makeCollection(str, function (str1, str2) { return str1.length - str2.length; });
	}
	
	function getObjectFunctions() {
		var fnList = {};
		$.each($, function (k, v) { $.isFunction($[k]) && (fnList[k] = "var "+ k +" = "+ v);});
		return fnList;
	}
	
	return {
		makeCollection: makeCollection,
		makeSortedCollection: makeSortedCollection,
		getObjectFunctions: getObjectFunctions
	};
});