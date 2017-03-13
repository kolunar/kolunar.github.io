var LoginController = {

	create : function(){
		
		this.model = new loginModel();
		this.view = new loginView("#login-page","#login-page-header","#login-page-content","#login-page-footer", this.model);	

		this.bindEvent(this);
		//this.Actions.Users.read('');
	},

	update : function(data){
		if(this.model !== undefined){
			//this.model.bind(data);
			////this.model.show();
		}
	},

	bindEvent : function(that){
		/****Delegates****/
	},

	unbindEvent : function(that){
		/* 	this method is not necessary if GC can handle this */
	}
};

/* =============================================================== */
/* User Actions from View will be notified to Model via Controller */
/* =============================================================== */

/************ Actions.Object.(CRUD) **************/

LoginController.Actions = {

	/******** Specific Actions ********/

	Users : {
		//LoginController.Actions.Header = {};

		/**** Users Specific Actions ****/

		create : function(callback){

		},
		read : function(callback){
			LoginController.model.checkUser(callback); //LoginController.view.bind
		},
		update : function(callback){

		},
		remove : function(callback){

		}
	}
};