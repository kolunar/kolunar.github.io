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
	var dummy = function(){
		alert('hi');
	},
	//Constructor
	checkListModel = function(){
		var self = this,data;

		self.loadData = function(str,callback){
			$.mobile.loading('show');
			$.ajax({
				//url: "api.php?type=checklist&str="+ str,
				url: "data/checklist.json",
				//data: { 'str': str },
				dataType: "json"
			}).done(function(data){
				self.data = data;
				if(data.result==="true"){
					self.checklist = data.checklist;
					CheckListController.view.bind();//notify its observers					
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

		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	checkListModel.prototype = {
		checklist: []		
	};
	
	if (typeof exports !== 'undefined') exports.checkListModel = checkListModel;
	else window.checkListModel = checkListModel;

})(window,jQuery);

