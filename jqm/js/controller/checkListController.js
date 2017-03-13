var CheckListController = {};

CheckListController.create = function(){

	CheckListController.model = new checkListModel();
	CheckListController.view = new checkListView("#checkListScrollWrapper","checkListPanel", CheckListController.model);
	
	CheckListController.bindEvent(CheckListController);	
	CheckListController.Actions.CheckList.read('');
}

CheckListController.update = function(data){
	if(CheckListController.model !== undefined){
		//CheckListController.model.bind(data);
		////CheckListController.model.show();
	}
	CheckListController.refreshScroll();
}


/* ================================== */
/* Adding Event listeners to the View */
/* ================================== */

CheckListController.bindEvent = function(that){
	/****Delegates****/		
	that.view.checkListScroll.on('beforeScrollStart', function(e){
		if(that.view.checkListScroll.options.firstTimeScroll){
			that.view.checkListScroll.options.firstTimeScroll = false;
			that.view.checkListScroll.refresh();
		}
	});

    var $listview = $("#listTab").find('[data-role="listview"]');
    $("#listTab input[data-type='search']").on('keyup', function() {
		that.view.checkListScroll.scrollTo(0, 0);
		that.view.checkListScroll.refresh();
        if ($listview.children(':visible').not('#no-results').length === 0) {
			$('#mainH1').html('no-results');
            //$('#no-results').fadeIn(500);
        } else {
			$('#mainH1').html('');
            //$('#no-results').fadeOut(250);
        }
    });

	setTimeout(function(){
		//checkListScroll.refresh();		
		
		//alert('H:'+height+", count:"+count+", str:"+str);
		//$("div#checkListScroll > div#checkListScrollWrapper > form.ui-filterable").detach().prependTo("#listTab");
		//$('#checkListPanel').attr('data-filter', 'true');
		//$('#checkListPanel').listview('option', 'filter', true);
		//$('#checkListPanel').listview('refresh');
		//$('#checkListPanel').trigger("listviewcreate");
		//$('#main-page').trigger("create");
	},1000);
};

CheckListController.unbindEvent = function(that){
	/* 	this method is not necessary if assuming GC can handle this */
};

CheckListController.refreshScroll = function(data){
	if(CheckListController.view.checkListScroll !== undefined)
		CheckListController.view.checkListScroll.refresh();
		//CheckListController.checkListScroll.scrollTo(0, 0);
};

CheckListController.refreshScroll = function(){
	CheckListController.view.refreshScroll();
};


/* =============================================================== */
/* User Actions from View will be notified to Model via Controller */
/* =============================================================== */

/************ Actions.Object.(CRUD) **************/

CheckListController.Actions = {};

/******** Specific Actions ********/

CheckListController.Actions.CheckList = {};
//CheckListController.Actions.Header = {};

/**** CheckList Specific Actions ****/

CheckListController.Actions.CheckList.create = function(callback){

};
CheckListController.Actions.CheckList.read = function(str, callback){
	CheckListController.model.loadData('', callback); //CheckListController.view.bind
};
CheckListController.Actions.CheckList.update = function(callback){

};
// CheckListController.Actions.CheckList.delete is invalid since delete is a reserved keyword
CheckListController.Actions.CheckList.remove = function(callback){ 


};
