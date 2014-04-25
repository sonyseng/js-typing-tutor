define(['jquery', 'esprima', 'escodegen'], function ($, esprima, escodegen) {
	// escodegen has issues with AMD loading
	escodegen = window.escodegen;

	function makeFnSourceCollection(str, sortFn) {
		return sortFn ? str.split(/\r?\n|\r/).sort(sortFn) : str.split(/\r?\n|\r/);
	}

	function makeSortedFnSourceCollection(str) {
		return makeFnSourceCollection(str, function (str1, str2) { return str1.length - str2.length; });
	}
	
	function isNativeFn (fnBody) {
		return /^\s*function[^{]+\s*\{\s*\[native code\]\s*\}\s*$/.test(fnBody);
	}
	
	function makeFnMap(obj) {
		var fnMap = {}, augmentedFnBody;
		
		$.each(obj, function (fnName, fnBody) { 
			if ($.isFunction(obj[fnName]) && !isNativeFn(fnBody)) {
				augmentedFnBody = 'var '+ fnName +' = '+ fnBody;
				fnMap[fnName] = makeSortedFnSourceCollection(escodegen.generate(esprima.parse(augmentedFnBody)));
			}
		});
		
		return fnMap;
	}
	
	//////////////// Initialization //////////////// 

	return {
		makeFnMap: makeFnMap
	};
});