
var MainPageController = {};

MainPageController.create = function(){
	
	createMainPageLayout();
	TablesController.create();
	CheckListController.create();
	OrderController.create();
};

MainPageController.refreshScroll = function() {
	if (MainPageController.view.mainPageScroll !== undefined)
		MainPageController.view.mainPageScroll.refresh();
	// if (TablesController.tableScroll !== undefined)
		// TablesController.tableScroll.refresh();
	// if (MainMenuController.view.mainMenuScroll !== undefined)
		// MainMenuController.view.mainMenuScroll.refresh();
};

//var mainMenuData;
//var subMenuData;
function createMainPageLayout() {

	MainPageController.model = new mainPageModel();
	MainPageController.view = new mainPageView(MainPageController.model);
	
	MainPageController.model.loadData('',function(){createDefaultMenu();});
}

function createDefaultMenu() {
	
	//mainMenuData = MainPageController.model.mainmenus;
	//subMenuData = MainPageController.model.submenus;
	//alert(mainMenuData.length+':'+subMenuData.length);

	MainMenuController.model.mainmenus = MainPageController.model.mainmenus;
	SubMenuController.model.submenus = MainPageController.model.submenus;
	//alert(MainMenuController.model.mainmenus.length+':'+SubMenuController.model.submenus.length);

	//createMainMenu();
	MainMenuController.create();	
	createMenuBreadCrumb(MainMenuController.model.activeItem);
	//createSubMenu(MainMenuController.model.activeItem);
	SubMenuController.create();
}


function createMenuBreadCrumb(data){
	
}
