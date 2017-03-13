(function(window,$){
	var dummy = function(){
		alert('hi');
	},
	//Constructor
	mainMenuModel = function(){
		var self = this;

		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	mainMenuModel.prototype = {
		mainmenus: [],
		activeItem: {}
	};
	
	if (typeof exports !== 'undefined') exports.mainMenuModel = mainMenuModel;
	else window.mainMenuModel = mainMenuModel;	
	
})(window,jQuery);
