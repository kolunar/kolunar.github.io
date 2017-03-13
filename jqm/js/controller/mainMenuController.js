/**
  * =================================================================================================  
  * The Controller acts as a route or a decision maker and the glue between the model and view. 
  * It updates the view when the model changes. (ref: Model-View bindings/two ways bindings).
  * It also adds event listeners to the view and updates the model when the user manipulates the view.
  * The Controller listens for the Events and acts accordingly. (ref: Controller-Event bindings).
  * It performs the Application Logic but not the Business Logic.
  * @ref:MVC https://developer.chrome.com/apps/app_frameworks 
  * =================================================================================================  
  * @author aml.nirvasoft@gmail.com  
*/

var MainMenuController = {
	model: new mainMenuModel()
};

MainMenuController.create = function() {
	
	//MainMenuController.model = new mainMenuModel();
	MainMenuController.view = new mainMenuView("#mainMenu","mainMenuPanel", MainMenuController.model);	

	MainMenuController.Events.bind();
	//MainMenuController.Actions.MainMenu.read('');	
}

MainMenuController.update = function(data) {
	if(MainMenuController.model !== undefined){
		//MainMenuController.model.bind(data);
		////MainMenuController.model.show();
	}
	MainMenuController.refreshScroll();
}

MainMenuController.Events = {
	bind: function() {
		/****Delegates****/
	},

	unbind: function() {
		/* 	this method is not necessary if GC can handle this */
	}
};

MainMenuController.refreshScroll = function() {
	if(MainMenuController.mainMenuScroll !== undefined)
		MainMenuController.mainMenuScroll.refresh();
		//MainMenuController.checkListScroll.scrollTo(0, 0);
}


/* =============================================================== */
/* User Actions from View will be notified to Model via Controller */
/* =============================================================== */

/************ Actions.Object.(CRUD) **************/

MainMenuController.Actions = {

	/******** Specific Actions ********/

	MainMenu: {
		/**** MainMenu Specific Actions ****/

		create: function(callback) {

		},
		read: function(str, callback) {
			MainMenuController.model.loadData('', callback); //MainMenuController.view.bind
		},
		update: function(callback) {

		},
		remove: function(callback) {

		}
	}

};



var mMainMenu;
var mainMenuScroll;
function createMainMenu() {

	if (mMainMenu !== undefined) {
		mMainMenu.bind(mainMenuData);
		//mMainMenu.show();
		//mMainMenu.bindData();
	}
	else {
		mMainMenu = new mainMenuView("#mainMenu","mainMenuPanel", mainMenuData);
	}
	
/* 	var width = 0;
	$('#mainMenuPanel .ui-btn').each(function() {
		width += $(this).outerWidth(true);//.outerWidth( true );
	});
	$("#mainMenuPanel").css('width', width+2); */
	
	if (mainMenuScroll !== undefined) {
		mainMenuScroll.refresh();
		//mainMenuScroll.scrollTo(0, 0);
	}
	else {
		doMainMenuScroll();
	}
	
	$("#mainMenu").trigger("create");
}

var scrollLog = function(str,obj) {
	console.log(
		str+
		': maxScrollX:'+obj.maxScrollX+
		', startX:'+obj.startX+
		', x:'+obj.x+
		', directionX:'+obj.directionX+
		', distX:'+obj.distX+
		', pointX:'+obj.pointX+
		(obj.options.snap?', pageX:'+obj.currentPage.pageX:'')
	);
};

var mainMenuScroll;
function doMainMenuScroll() {


}