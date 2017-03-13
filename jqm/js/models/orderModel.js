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
		alert('orderModel');
	};
	//Constructor
	var orderModel = function(){
		var self = this,data;
		
		self.loadData = function(chkno,callback){
			$.mobile.loading('show');
			$.ajax({
				//url: "api.php?type=order&chkno="+ chkno,
				url: "data/orders.json",
				//data: { 'chkno': chkno },
				dataType: "json"
			}).done(function(data){
				self.data = data;
				if(data.result==="true"){
					self.header = data.header;
					self.details = data.details;
					OrderController.view.bind();//notify its observers					
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
		//dummy();
	};
	
	// Prototype
	orderModel.prototype = {
		header: {},
		details: [],
		append:function(data){
			//console.dir(data);
			var self = this;
			self.details.push(data);
			//console.dir(self.details);
		},
		remove:function(index){
			var self = this;
			self.details.splice(index,1);
			//console.dir(self.details);
		},
		replaceNormal:function(index,data){
			self.details.splice(index,1,{"app":"goodbyeworld","message":"cya"});
		},
		replaceSub:function(pIndex,cIndex,data){
			//TODO::
		}
	};
	
	if (typeof exports !== 'undefined') exports.orderModel = orderModel;
	else window.orderModel = orderModel;

})(window,jQuery);

