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
	var loginModel = function(){
		var self = this;
		
		self.checkUser = function(callback){
			$.mobile.loading('hide');
			$.getJSON( //"login.php?uid=" + self.userID + "&pw=" + self.password + "&rdm=" + Math.random(),
				"data/login.json?uid=" + self.userID + "&pw=" + self.password + "&rdm=" + Math.random(),			
				function(data){
					if (data.result==="true"){
						self.user.role = data.role;
						
						if (typeof(Storage) !== "undefined") {
							localStorage.myRole = data.role;
							localStorage.myName = self.userID;
							localStorage.isValidUser = true;					
						}
					}else{
						if (typeof(Storage) !== "undefined") {
							localStorage.clear();
						}
					}
					if (callback && typeof(callback) === "function") {
						callback(data.result);
					}
					$.mobile.loading('hide');
				}
			);
		}
	};
	
	//Prototype's members are "non-static", inaccessible unless instantiated as a new object
	loginModel.prototype = {
		user : {},
		userID : '',
		password : ''
	};
	
	if (typeof exports !== 'undefined') exports.loginModel = loginModel;
	else window.loginModel = loginModel;

})(window,jQuery);

