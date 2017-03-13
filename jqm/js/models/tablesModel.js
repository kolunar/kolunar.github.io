(function(window,$){

	//Constructor
	var tablesModel = function(wrap,id,data){
		var self = this;
		
		self.loadData = function(str,callback){
			$.mobile.loading('show');
			$.ajax({
				//url: "api.php?type=tables&str="+ str,
				url: "data/tables.json",
				//data: { 'str': str },
				dataType: "json"
			}).done(function(data){
				self.data = data;
				if (data.result === "true") {
					self.tables = data.tables;
					TablesController.view.bind();//notify its observers					
				}
				if (callback && typeof(callback) === "function") {
					callback();
				}
			}).fail(function(){
				alert('error');
			}).always(function(){
				$.mobile.loading('hide');
			});
			//use jqXHR.then() in order to chain the request
		};

		self.activeItem;

	};
	// Prototype
	tablesModel.prototype = {
		tables: []	
	};
	
	if (typeof exports !== 'undefined') exports.tablesModel = tablesModel;
	else window.tablesModel = tablesModel;

})(window,jQuery);

