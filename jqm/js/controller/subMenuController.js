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

var SubMenuController = {
	model: new subMenuModel()
};

SubMenuController.create = function() {
	if (SubMenuController.view !== undefined) {
		//mSubMenu.show();
		//$("#subMenu").trigger("create");
		SubMenuController.view.bind(SubMenuController.model.submenus, MainMenuController.model.activeItem);
	}
	else {
		//SubMenuController.model = new subMenuModel();
		SubMenuController.view = new subMenuView("#subMenu", "subMenuPanel", SubMenuController.model, 
									MainMenuController.model.activeItem, SubMenuController.Actions.doSubMenuClick);		

		SubMenuController.Events.bind();
		//SubMenuController.Actions.MainMenu.read('');		
	}
}

SubMenuController.update = function(data) {
	if(SubMenuController.model !== undefined){
		//SubMenuController.model.bind(data);
		////SubMenuController.model.show();
	}
	SubMenuController.refreshScroll();
}

SubMenuController.Events = {
	bind: function() {
		/****Delegates****/
	},

	unbind: function() {
		/* 	this method is not necessary if GC can handle this */
	}
};

SubMenuController.refreshScroll = function() {
	if(SubMenuController.mainMenuScroll !== undefined)
		SubMenuController.mainMenuScroll.refresh();
		//SubMenuController.checkListScroll.scrollTo(0, 0);
}


/* =============================================================== */
/* User Actions from View will be notified to Model via Controller */
/* =============================================================== */

/************ Actions.Object.(CRUD) **************/

SubMenuController.Actions = {

	/******** Specific Actions ********/

	SubMenu: {
		/**** MainMenu Specific Actions ****/

		create: function(callback) {

		},
		read: function(str, callback) {
			SubMenuController.model.loadData('', callback); //SubMenuController.view.bind
		},
		update: function(callback) {

		},
		remove: function(callback) {

		},
		
		addToOrder: function(callback) {
			
		}
	},
	doSubMenuClick: function(){
		var item = SubMenuController.model.activeItem;
		//console.dir(item);
		alert('doSubMenuClick');
		OrderController.Actions.OrderItem.add(item);
		// if (OrderController.model !== 'undefined') {
			// //OrderController.model.remove(index);
			// OrderController.model.append(item);
		// }
	}	
};
