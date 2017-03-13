var FunctionsController = {};

FunctionsController.create = function() {
	$('#main-page').prepend(getLeftMenu('leftMenu')).prepend(getRightMenu('rightMenu'));//.trigger("create");
	
	FunctionsController.leftPanelScroll = new IScroll('#leftMenu .panel-scrollwrapper', {
		scrollX: false,
		scrollY: true,
		snap: false,
		bounce: false,
		momentum: true,
		preventDefault: true, 
		mouseWheel: false,
		scrollbars: true,
		fadeScrollbars: true
	});

	FunctionsController.rightPanelScroll = new IScroll('#rightMenu .panel-scrollwrapper', {
		scrollX: false,
		scrollY: true,
		snap: false,
		bounce: false,
		momentum: true,
		preventDefault: true, 
		mouseWheel: false,
		scrollbars: true,
		fadeScrollbars: true
	});
	
	FunctionsController.bindEvent(FunctionsController);
}

FunctionsController.refreshScroll = function() {
	if (FunctionsController.leftPanelScroll !== undefined)
		FunctionsController.leftPanelScroll.refresh();
	if (FunctionsController.rightPanelScroll !== undefined)
		FunctionsController.rightPanelScroll.refresh();	
}

FunctionsController.bindEvent = function(that) {
	/****Delegates****/
	var freezeUnderlyingScroll = function(freeze,e,leftShown) {

		if (MainPageController.view.mainPageScroll !== undefined) {
			//console.log(freeze);
			if (freeze) {
				MainPageController.view.mainPageScroll._end(e);
				if (leftShown) {
					if (MainPageController.view.activeTab !== undefined 
					&& MainPageController.view.activeTab.text() === 'Menus' 
					&& MainMenuController.view.mainMenuScroll !== undefined)
						MainMenuController.view.mainMenuScroll._end(e);
					
/* 					if(that.leftPanelScroll !== undefined){
						//leftPanelScroll._execEvent('scrollEnd');
						for ( var i = that.leftPanelScroll.indicators.length; i--; ) {
							that.leftPanelScroll.indicators[i].fade();
						}
					} */
				}
				////MainPageController.view.mainPageScroll._transitionEnd(e);
				////MainPageController.view.mainPageScroll._execEvent('scrollEnd');
				////MainPageController.view.mainPageScroll._execEvent('scrollCancel');
				////MainPageController.view.mainPageScroll._execEvent('flick');			
				//MainPageController.view.mainPageScroll.enabled = false;
				//console.log('UnderlyingScroll.disabled');
			}
			else {
				//MainPageController.view.mainPageScroll.enabled = true;
/*  			setTimeout(function(){
					MainPageController.view.mainPageScroll.enabled = true;
				},100); */
				//console.log('UnderlyingScroll.enabled');		
			}
		}

	},	
	
	leftMenuShown = function() {	
		return $('#leftMenu').hasClass("ui-panel-open");
		//return ($( ".ui-page-active" ).jqmData( "panel" ) === "open");
		//return !($('#leftMenu').css("visibility") == "hidden");
	},
	
	rightMenuShown = function() {	
		return $('#rightMenu').hasClass("ui-panel-open");
		//return ($( ".ui-page-active" ).jqmData( "panel" ) === "open");
		//return !($('#rightMenu').css("visibility") == "hidden");
		//return $("#rightMenu").classList.contains("ui-panel-open");
	},
	
	showLeftMenu = function(e) {
		if (!leftMenuShown()) {
			if (MainPageController.view.mainPageScroll !== undefined) {
				MainPageController.view.mainPageScroll._end(e);
				MainPageController.view.mainPageScroll.enabled = false;
			}
			if (MainPageController.view.activeTab !== undefined 
			&& MainPageController.view.activeTab.text() === 'Menus' 
			&& MainMenuController.view.mainMenuScroll !== undefined) {
				MainMenuController.view.mainMenuScroll._end(e);
				MainMenuController.view.mainMenuScroll.enabled = false;
			}
			$("#leftMenu").panel("open");
		}
	},
	
	hideLeftMenu = function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		$("#leftMenu").panel("close");
	},
	
	showRightMenu = function() {
		if(!rightMenuShown()){
			$("#rightMenu").panel("open");				
		}
	},
	
	hideRightMenu = function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();	
		$("#rightMenu").panel("close");
	};
	
	/* Swipe Open */
 	$("#mainWrapper").swipe({
 		excludedElements:"input,.noSwipe",
		swipeRight:function(e, direction, distance, duration, fingerCount) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			//freezeUnderlyingScroll(true,e,true);
			showLeftMenu(e);
		},
		threshold:50
	});	
	
	$("#orderWrapper").swipe({
		swipeLeft:function(e, direction, distance, duration, fingerCount) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			if(MainPageController.view.mainPageScroll !== undefined)
				MainPageController.view.mainPageScroll._end(e);
			$("#rightMenu").panel("open");
			//freezeUnderlyingScroll(true,e,false);			
			//showRightMenu();
		},
		threshold:50
	});	
	
	/* Tap Open */
 	$("#showMenu").on("mousedown",function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		showLeftMenu(e);
	});
	
 	$("#showFunction").on("click",function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		$("#rightMenu").panel("open");
		//showRightMenu();
	});	
	
	$("#showOrder").on("click", function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		if (MainPageController.view.mainPageScroll !== undefined)
			MainPageController.view.mainPageScroll.next();
		//$('#pageWrapper').animate({left:'-100%'});			
	});

	$("#showMain").on("mousedown", function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		if (MainPageController.view.mainPageScroll !== undefined)
			MainPageController.view.mainPageScroll.prev();
		//$('#pageWrapper').animate({left:'0'});// not hardware accelerated	compared to CSS3 Translate
	});
	
	//unbind n override the default jqm handler if n only if jqm's been initialized
/* 	$(".ui-panel-dismiss").off().on("mousedown",function(e){
		if(leftMenuShown()){
			hideLeftMenu(e);
			freezeUnderlyingScroll(false,e,true);			
		}
		else{
			hideRightMenu(e);
			freezeUnderlyingScroll(false,e,false);			
		}
	}); */
	
	$("#leftMenu").on("panelbeforeopen", function(e,ui) {
		MainPageController.view.mainPageScroll.enabled = false;
	});
	$("#rightMenu").on("panelbeforeopen", function(e,ui) {
		MainPageController.view.mainPageScroll.enabled = false;
	});	
	
	$("#leftMenu").on("panelclose", function(e,ui) {
		setTimeout(function(){
			MainPageController.view.mainPageScroll.enabled = true;
			if(!MainMenuController.view.mainMenuScroll.enabled)
				MainMenuController.view.mainMenuScroll.enabled = true;
		},100);
		//freezeUnderlyingScroll(false,e,true);
	});
	$("#rightMenu").on("panelclose", function(e,ui) {
		setTimeout(function() {
			MainPageController.view.mainPageScroll.enabled = true;
		},100);
		//freezeUnderlyingScroll(false,e,false);
	});
	
/*  $(".ui-panel-dismiss").swipe({
		swipeLeft:function(e, direction, distance, duration, fingerCount) {
			if(leftMenuShown()){
				hideLeftMenu(e);
				freezeUnderlyingScroll(false,e,true);
			}
		},
		swipeRight:function(e, direction, distance, duration, fingerCount) {
			if(rightMenuShown()){
				hideRightMenu(e);
				freezeUnderlyingScroll(false,e,false);
			}
		},
		threshold:50
	}); */
	
/* 	$("#leftMenu").swipe({
		excludedElements:"input,.noSwipe",
		swipeLeft:function(e, direction, distance, duration, fingerCount) {
			hideLeftMenu(e);
			freezeUnderlyingScroll(false,e,true);
		},
		threshold:50
	}); */
	
/* 	$("#rightMenu").swipe({
		excludedElements:"input,.noSwipe",	
		swipeRight:function(e, direction, distance, duration, fingerCount) {
			that.rightPanelScroll._end(e);
			hideRightMenu(e);
			freezeUnderlyingScroll(false,e,false);
		},
		threshold:50
	}); */
}
