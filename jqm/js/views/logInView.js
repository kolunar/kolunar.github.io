/**
  * ===================================================================================================== 
  * View renders the Model into user interface which gathers dynamic data to create UI context.
  * It's the only part that is allowed to access to the DOM. 
  * It's responsible for applying event listeners to DOM elements.
  * If you want to more clearly separate UI or document markup (HTML) from the BusinessLogic layer 
  * (ie. code-behind), then consider implementing MVVM or MVP pattern.
  * Libraries such as Knockout.js supports MVVM,
  * whereas Backbone.js, Angular.js, Agility.js etc... support MVC pattern.
  * @ref:MVC https://developer.chrome.com/apps/app_frameworks 
  * @ref:MVVM http://knockoutjs.com/documentation/introduction.html
  * @ref:MVVM http://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/
  * @ref:MVVM http://msdn.microsoft.com/en-us/magazine/hh297451.aspx
  * @ref:MVVM http://www.developer-tech.com/news/2012/dec/13/knockoutjs-mvvm-framework-jquery-developers/
  * =====================================================================================================
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
	loginView = function(pageId,headerId,contentId,footerId,model){
		var self = this,e,
		initWidget = function(){			
			$("#login-page-header").html("<h3 class='ui-title'>Login</h3>");
			$("#login-page-content").html( "<input id='userid' type='text' placeholder='User ID'>"+
								"<input id='password' type='password' placeholder='Password'>"+						
								"<button id='btnSignin'>Sign In</button>"+
								"<div id='lblStatusControl'><label id='lblLoginStatus'></label></div>");
			//$("#login-page-footer").html("");						
			$("#login-page").trigger("create");

			$('#btnSignin').on('tap', function(){
				$.mobile.loading('show')
				model.userID = $("#userid").val();
				model.password = $("#password").val();
				//checkUser();
				LoginController.Actions.Users.read(function(result){
					if (result === "true"){
						$("body").pagecontainer("change", "#main-page", {reloadPage: false});
						//$( ":mobile-pagecontainer" ).pagecontainer( "change", "main.html?param="+userID, {reloadPage: true} );
						//$("body").pagecontainer("change", "main.html?param="+userID, {reloadPage: true});
						//$.mobile.pageContainer.pagecontainer("change", "target", { options });
						//$("body").pagecontainer("change", "#main-page", {reloadPage: false});
						//createPages(role);
						//callMenu(role);						
					}
					else {
						$("#lblLoginStatus").text("Invalid User Login");						
					}
				});
				return false;
			});
		};

		initWidget();
		self.wrapper = $(pageId);
		self.content = self.wrapper.find(contentId);//.children[0];

		//dummy();
		//alert('mod loaded');
	};
	//Prototype
	loginView.prototype = {
		visible: true,
		headers: [],
		show:function(){
			var self = this;
			self.wrapper.show();
			visible = true;
		},
		hide:function(){
			var self = this;
			self.wrapper.hide();
			visible = false;
		}
	};
	
	if (typeof exports !== 'undefined') exports.loginView = loginView;
	else window.loginView = loginView;

})(window,jQuery);
