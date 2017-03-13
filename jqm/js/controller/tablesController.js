var TablesController = {

	create : function(){
		
		this.model = new tablesModel();
		this.view = new tablesView("#tableTab","tablePanel", this.model);	

		this.bindEvent(this);
		this.Actions.Tables.read('');	
	},

	update : function(data){
		if(this.model !== undefined){
			//this.model.bind(data);
			////this.model.show();
		}
		this.refreshScroll();
	},

	bindEvent : function(that){
		/****Delegates****/
	},

	unbindEvent : function(that){
		/* 	this method is not necessary if GC can handle this */
	},

	refreshScroll : function(){
		if(this.tableScroll !== undefined)
			this.tableScroll.refresh();
			//this.checkListScroll.scrollTo(0, 0);
	}
};

/* =============================================================== */
/* User Actions from View will be notified to Model via Controller */
/* =============================================================== */

/************ Actions.Object.(CRUD) **************/

TablesController.Actions = {

	/******** Specific Actions ********/

	Tables : {
		//TablesController.Actions.Header = {};

		/**** Tables Specific Actions ****/

		create : function(callback){

		},
		read : function(str, callback){
			TablesController.model.loadData('', callback); //TablesController.view.bind
		},
		update : function(callback){

		},
		remove : function(callback){

		}
	}
};