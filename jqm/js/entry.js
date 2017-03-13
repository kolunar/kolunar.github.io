/**
  * =================================================================================================
  * This is an entry point of the application based on jquery mobile which also implies MVC patterns.
  * @plugins iscroll5, http://cubiq.org/iscroll-5
  * @plugins touchSwipe, https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  * @plugins jquery.i18n.properties, https://code.google.com/p/jquery-i18n-properties/
  * @plugins jquery.number.js, https://github.com/teamdf/jquery-number/ @doc http://plugins.jquery.com/df-number-format/
  
  * for the best practices of javascript MVC and coding styles, refer to the links below
  * @ref https://developer.chrome.com/apps/app_frameworks 
  * @ref http://techwhizbang.com/2011/04/javascript-mvc-pattern/
  * @ref http://www.thinkful.com/learn/javascript-best-practices-1/
  * @ref http://code.tutsplus.com/tutorials/24-javascript-best-practices-for-beginners--net-5399  
  * ================================================================================================= 
  * @author aml.nirvasoft@gmail.com   
*/

var title = "mPOS";

function setTitle() {
	document.title= title;
}

$(document).on( "pageshow", "#default-page", function(e,data) {
	localStorage.clear();
	//alert("pageshow:#default-page");
	//$("#default-page-footer").html("pageshow:#default-page");
	var parameters = $(this).data("url").split("?")[1];
	if (parameters !== undefined) {
		var parameter = parameters.replace("param=","");
		alert(parameter);
	}

	setTimeout(function(){
		if (typeof(Storage) !== "undefined") {
			if (localStorage.isValidUser) {
				$("body").pagecontainer("change", "#main-page", {reloadPage: false});
			}
			else {
				$("body").pagecontainer("change", "#login-page", {reloadPage: false});
			}
		}
	},2000);

});

$(document).on( "pageinit", "#login-page", function(e,data) {		
	//alert("pageinit:#login-page");
	jQuery.i18n.properties({
		name: 'Messages', 
		path: 'locales/',
		language: 'zh',
		//mode: 'both', //jQuery.i18n.prop('CONFIRM_SUCCESS')
		callback: function(){ alert( RELEASE_HOLD_ITEM ); }
	});
	if (typeof(Storage) !== "undefined") {
		localStorage.clear();
		//if(loginView === "undefined"){
			setTitle();
			LoginController.create();
		//}
	}
});

$(document).on( "pageshow", "#main-page", function(e,data) {
	//alert(data.prevPage.attr('id'));
	//localStorage.isValidUser = false;
	//alert("pageinit:#main-page");
	jQuery.i18n.properties({
		name: 'Messages', 
		path: 'locales/',
		language: 'zh',
		//mode: 'both', //jQuery.i18n.prop('CONFIRM_SUCCESS')
		callback: function(){ alert( CONFIRM_SUCCESS ); }
	});	
	var parameters = $(this).data("url").split("?")[1];
	if (parameters !== undefined){
		var parameter = parameters.replace("param=","");
		//alert(parameter);
	}
	if (typeof(Storage) !== "undefined") {
		//localStorage.myRole;
		//localStorage.myName;
		if (localStorage.isValidUser){
			//alert("isValidUser");
			createPages();
		}
		else {
			$("body").pagecontainer("change", "#login-page", {reloadPage: false});
		}
	}
});

$(document).ready(function() {
	//$("#default-page-footer").html("ready:#default-page");
});


function createPages(){
	//alert( CONFIRM_SUCCESS );
	MainPageController.create();
		FunctionsController.create();
		
		// ::before will b overridden by jqm events
		$('#main-page').trigger("create");
		// ::after will override jqm events
		
		resizeMainPage();

		setTimeout(function(){
			//$('#main-page').trigger("create");
			//$('#tabBar').tabs("option", "active", 0);
		},500); 

		/* For Responsive Resizing (hits performance on UI while loading touch KB) */
	/* 	$(window).resize(function() {
			resizeMainPage();
		}); */

}

var viewportHeight, tabHeight, subMenuHeight, checkListHeight;
function resizeMainPage(){
	viewportHeight = $('.ui-mobile-viewport').height()-4;
	$("#main-page-content, .ui-panel-display-overlay, .ui-panel-dismiss, .ui-panel-inner").css('height', viewportHeight);
	tabHeight = viewportHeight - $("#tableTab").offset().top;
	$("#tableTab, #menuTab, #listTab, #checkListScroll").css('height', tabHeight);
	subMenuHeight = tabHeight - 70;
	$("#subMenu").css('height', subMenuHeight);
	//checkListHeight = tabHeight - 45;
	//$("#checkListScroll").css('height', checkListHeight);
	
	$("#orderListScroll").css('height', tabHeight - 50);
	
	MainPageController.refreshScroll();
	FunctionsController.refreshScroll();
	$(".ui-panel-position-left").panel( "option", "dismissible", false );
}

