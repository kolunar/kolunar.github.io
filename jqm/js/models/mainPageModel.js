/**
  * =================================================================================================  
  * Model is where the application’s data objects are stored. 
  * It doesn't have to be an entity nor to be persistent.
  * Validations and data-specific calculations logics will be defined here.
  * Generally, Model performs most of the business logic 
  * which complies the "fat model, skinny controller" design pattern.
  * The Model doesn’t know anything about views and controllers. 
  * When a Model changes, typically it will notify its observers that a change has occurred.
  * @ref:MVC https://developer.chrome.com/apps/app_frameworks 
  * @ref:MVVM https://gist.github.com/AlbertoMonteiro/1370875
  * =================================================================================================  
  * @author aml.nirvasoft@gmail.com  
*/

/*	
===============================================================================
The following Snippet applies Immediately-Invoked Function Expressions (IIFEs),
a self-invoking anonymous function which executes itself in-line immediately.
===============================================================================
*/

(function(window,$){

	//Constructor
	var mainPageModel = function(wrap,id){
		var self = this,data;
		
		self.loadData = function(str,callback){
			$.mobile.loading('show');
			$.ajax({
				//url: "api.php?type=menus&str="+ str,
				url: "data/menus.json",
				//data: { 'str': str },
				dataType: "json"
			}).done(function(data){
				self.data = data;
				if(data.result==="true"){
					self.mainmenus = data.mainmenus;
					self.submenus = data.submenus;
					//alert('cb'+self.mainmenus.length+':'+self.submenus.length);
					//MainPageController.view.bind();//notify its observers					
				}
				/**
				 * @ref: http://www.impressivewebs.com/callback-functions-javascript/ 
				 * @ref: http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
				*/
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
	mainPageModel.prototype = {
		mainmenus: [],
		submenus: []
	};
	
	if (typeof exports !== 'undefined') exports.mainPageModel = mainPageModel;
	else window.mainPageModel = mainPageModel;

})(window,jQuery);

