(function(window,$){
	var dummy = function(){
		alert('hi');
	},
	//Constructor
	subMenuModel = function(){
		var self = this;

		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	subMenuModel.prototype = {
		submenus: [],
		activeItem: {}
	};
	
	if (typeof exports !== 'undefined') exports.subMenuModel = subMenuModel;
	else window.subMenuModel = subMenuModel;

})(window,jQuery);

