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

var OrderController = {}; //a Global Object

OrderController.create = function(data){

	OrderController.model = new orderModel();
	OrderController.view = new orderView("#orderListScrollWrapper","orderList",OrderController.model);
	
	// OrderController.model.append(eval("({'sk':190,'psk':001,'type':1,'desc':'Menu0','price':123.00})"));
	
	setTimeout(function(){
		OrderController.view.remove(1);
		//OrderController.view.wrapper.trigger("create");
		//OrderController.view.content.listview('refresh');
		//OrderController.view.content.trigger("listviewcreate");			
		OrderController.view.refreshScroll();
	},1000);
	
	OrderController.bindEvent(OrderController);
};

/* ================================== */
/* Adding Event listeners to the View */
/* ================================== */

OrderController.bindEvent = function(that){
	/****Delegates****/
};

OrderController.unbindEvent = function(that){
	/* 	this method is not necessary if assuming GC can handle this */
};

OrderController.refreshScroll = function(data){
	if(OrderController.view !== undefined){
		//OrderController.view.bind(data);
		////OrderController.view.show();
		OrderController.view.refreshScroll();
	}
};

OrderController.refreshScroll = function(){
	OrderController.view.refreshScroll();
};


/* =============================================================== */
/* User Actions from View will be notified to Model via Controller */
/* =============================================================== */

/************ Actions.Object.(CRUD) **************/

OrderController.Actions = {

	/******** Specific Actions ********/

	Check: {
		/**** Check Specific Actions ****/

		create: function(callback){

		},
		read: function(checkno, callback){
			OrderController.model.loadData('001', callback); //OrderController.view.bind
		},
		update: function(callback){

		},
		remove: function(callback){

		}
	},
	Header: {
		/**** Header Specific Actions ****/

		create: function(callback){

		},
		read: function(callback){

		},
		update: function(callback){

		},
		remove: function(callback){

		},	
	},
	Details: {
		/**** Details Specific Actions ****/

		create: function(callback){
			OrderController.view.append
		},
		read: function(callback){

		},
		update: function(callback){

		},
		remove: function(callback){

		}
	},
	OrderItem: {
		/**** OrderItem Specific Actions ****/

		add: function(item){
			OrderController.view.append(item);
		},
		remove: function(callback){
			
		},
		replace: function(callback){

		}
	},

};