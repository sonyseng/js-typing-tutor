require(['Game', 'jquery'], function (game, $) {
	
	describe("Game source code initializer", function () {
		it("returns all functions within the jQuery object", function () {
			var fnMap = game.makeFnMap($);
			
			// jQuery should have these functions
			expect(fnMap.each).toBeTruthy();
			expect(fnMap.noConflict).toBeTruthy();
			
			// Not a function
			expect(fnMap.fn).toBeFalsy();
			
			expect(fnMap.each.length).toBeGreaterThan(0);
			expect(fnMap.noConflict.length).toBeGreaterThan(0);
		});
	});
	
	
	// TODO: Test Main code
	
	
});
