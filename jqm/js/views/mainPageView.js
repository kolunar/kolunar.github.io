
var mainMenuWrapperId = '';
var mainMenuContentId = '';
var subMenuWrapperId = '';
var subMenuContentId = '';
var tableWrapperId = '';
var tableContentId = '';
var checkListWrapperId = '';
var checkListContentId = '';

(function(window,$) {

	//Constructor
	var mainPageView = function(model) {
		var self = this;
	
		$("#main-page-header").html(getMainPageHeaderView());
		$("#main-page-content").html(getMainPageContentView());
		//$("#main-page-footer").html("");	
		
		var activeTab = $("li#activeTab");
		// $(activeTab.data('tab')).show();
		// $($('#tabBar').data('default-tab')).hide();
		// $(this).closest('.ui-navbar').find('a').removeClass('ui-btn-active');

		$("#tabBar").off().on('tap','li',function(e) {
			//console.log('this:'+$(this).data('tab'));
			if (activeTab !== undefined) {
				//alert(activeTab.data('tab'));			
				self.doActiveSearch($(this).data('tab'));
				if (activeTab.data('tab') !== $(this).data('tab')) {
					//alert(activeTab.data('tab'));
					$(activeTab.data('tab')).hide();
					$($(this).data('tab')).show();
					//alert($('#tabBar').data('default-tab'));
					//alert('activeTab:'+activeTab.data('tab')+'(vs)'+'thisTab:'+$(this).data('tab'));
				}
				activeTab = $(this);
			}
			else {
				self.doActiveSearch($(this).data('tab'));
				activeTab = $(this);
				$($('#tabBar').data('default-tab')).hide();
				$(activeTab.data('tab')).show();
				//$(this).closest('.ui-navbar').find('a').removeClass('ui-btn-active');
				//alert('err:undefined');
				//alert($('#tabBar').data('default-tab'));
			}
			self.activeTab = activeTab;
			//console.log('activeTab:'+activeTab.data('tab'));
		});
		self.doActiveSearch = function(tab) {
			if (tab === '#tableTab') {
				$("#table-filter").show();
				$("#menu-filter").hide();
				$("#checkList-filter").hide();
				//alert('#tableTab');
			}
			else if (tab === '#menuTab') {
				$("#table-filter").hide();
				$("#menu-filter").show();
				$("#checkList-filter").hide();	
		/* 		if(mainMenuScroll !== undefined)
					mainMenuScroll.refresh(); */
				//alert('#menuTab');
			}
			else if (tab === '#listTab') {
				$("#table-filter").hide();
				$("#menu-filter").hide();
				$("#checkList-filter").show();
				//alert('#listTab');
			}
		};
		
		self.mainPageScroll = createScroll(this);		
	},
	getMainPageHeaderView = function() {
		var html = 
			"<div id='mainH1' class='ui-title'>"+
			"	<div id='table-filter' class='header-filter' role='heading'>"+
			"		<form>"+
			"			<input id='pre-rendered-table-filterable' data-type='search' placeholder='Search Table...'>"+
			"		</form>"+
			"	</div>"+
			"	<div id='menu-filter' class='header-filter' role='heading'>"+
			"		<form>"+
			"			<input id='pre-rendered-menu-filterable' data-type='search' placeholder='Search Menu...'>"+
			"		</form>"+
			"	</div>"+
			"	<div id='checkList-filter' class='header-filter' role='heading'>"+
			"		<form>"+
			"			<input id='pre-rendered-checkList-filterable' data-type='search' placeholder='Search Check...'>"+
			"		</form>"+
			"	</div>"+
			"</div>"
		return html;			
	},
	getMainPageContentView = function() {

		var html = 
			"<div id='pageWrapper'>"+
			"	<div id='mainWrapper'>"+

			"		<div id='mainHeader' class='ui-header ui-bar-inherit'>"+
			"			<a href='#' id='showMenu' class='ui-btn-left ui-btn ui-icon-gear ui-btn-icon-notext ui-shadow ui-corner-all'>Menu</a>"+

			"			<a href='#' id='showOrder' class='ui-btn-right ui-btn ui-icon-carat-r ui-btn-icon-notext ui-shadow ui-corner-all'>Order</a>"+
			"		</div>"+
			"		<div data-role='tabs' id=\"mainTabs\">"+
			"			<div data-role='navbar'>"+
			"				<ul id='tabBar' data-default-tab='#tableTab'>"+
			"					<li id='activeTab' data-tab='#tableTab'><a href='#tableTab' class='ui-btn-active ui-state-persist' data-ajax='false' data-icon='grid'>Tables</a></li>"+
			"					<li data-tab='#menuTab'><a href='#menuTab' data-ajax='false' data-icon='star'>Menus</a></li>"+
			"					<li data-tab='#listTab'><a href='#listTab' data-ajax='false' data-icon='bullets'>List</a></li>"+
			"				</ul>"+
			"			</div>"+
			"			<div id='tableTab' class='ui-body-f'>"+
			"			</div>"+
			"			<div id='menuTab' class='ui-body-f'>"+
			"				<div id='mainMenu' class='noSwipe'></div>"+
			"				<div id='menuBreadCrumb'></div>"+
			"				<div id='subMenu'></div>"+
			"			</div>"+
			"			<div id='listTab' style='height:400px;' class=\"ui-body-f\">"+

			"				<div id='checkListScroll'><div id='checkListScrollWrapper'></div></div>"+
			"			</div>"+
			"		</div>"+
			"	</div>"+
			"	<div id='orderWrapper'>"+
			"		<div id='orderPageHeader' class='ui-header ui-bar-inherit'>"+
			"			<a href='#' id='showMain' class='ui-btn-left ui-btn ui-icon-carat-l ui-btn-icon-notext ui-shadow ui-corner-all'>B</a>"+
			"			<div id='orderH1' class='ui-title' role='heading'>"+
			"				&nbsp;"+
			"			</div>"+
			"			<a href='#' id='showFunction' class='ui-btn-right ui-btn ui-icon-bars ui-btn-icon-notext ui-shadow ui-corner-all'>Order</a>"+
			"		</div>"+
			"		<div id='orderContent' class='ui-body-f' style='text-align:center;border:0;'>"+
			"			<div id='orderHeader'>"+
			"				<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:.2em;float:left;'>"+
			"					<a class='ui-btn ui-corner-all ui-icon-grid ui-btn-icon-left'>01</a>"+
			"					<a class='ui-btn ui-corner-all ui-icon-user ui-btn-icon-left'>1</a>"+
			"					<a class='ui-btn ui-corner-all ui-icon-bullets ui-btn-icon-left ui-li-has-count'>0001<span class='ui-li-count'>Pending</span></a>"+
			//"					<label for='checkbox-all'>&nbsp;&nbsp;</label>"+
			//"					<input type='checkbox' name='checkbox-all' id='checkbox-all' data-iconpos='notext' />"+	
			"				</fieldset>"+
			"				<fieldset data-role='controlgroup' data-inline='true' style='margin:.2em;font-size:12.5px;position:absolute;right:0;padding:0'>"+
			"					<input type='checkbox' name='checkbox-all' id='checkbox-all' checked='' data-inline='true' data-iconpos='notext' />"+
			"					<label id='lbl-checkbox-all' class='lbl-checkbox-notext' for='checkbox-all'>Cheetos</label>"+
			"				</fieldset>"+
			"				<div class='clear'></div>"+
			"			</div>"+
			"			<div id='orderListScroll'>"+ //class='ui-body-f'>"+
			"				<div id='orderListScrollWrapper'> "+
			"				</div>"+
			"			</div>"+
			"			<div id='orderFooter' style='position:absolute;bottom:0;width:50%;background-color:cyan;'>"+
			"				<div id='orderFooterScrollWrapper'> "+

			"					<div id='totalBar' class='ui-grid-c ui-bar-inherit'>"+
    		"						<div class='ui-block-a'>"+
			"							<div class='ui-bar ui-bar-a' style=''>Qty:</div>"+
			"							<input name='txtTotQty' disabled id='txtTotQty' data-wrapper-class='controlgroup-textinput ui-btn order-totQty' type='text' data-mini='true' value='23' />"+		
			"						</div>"+
    		"						<div class='ui-block-b'>"+
			"							<div class='ui-bar ui-bar-a' style=''>Disc:</div>"+
			"							<input name='txtTotDisc' disabled id='txtTotDisc' data-wrapper-class='controlgroup-textinput ui-btn order-totDisc' type='text' data-mini='true' />"+		
			"						</div>"+
    		"						<div class='ui-block-c'>"+
			"							<div class='ui-bar ui-bar-a' style=''>Sub Total:</div>"+
			"						</div>"+
    		"						<div class='ui-block-d'>"+
			"							<div class='ui-bar ui-bar-a' style=''>"+			
			"								<input name='txtSubTot' disabled id='txtSubTot' data-wrapper-class='controlgroup-textinput ui-btn order-subTot' type='text' data-mini='true' />"+		
			"							</div>"+
			"						</div>"+
    		"						<div class='ui-block-a'>"+
			"							<div class='ui-bar ui-bar-a' style=''>S.C:</div>"+
			"							<input name='txtTotSC' disabled id='txtTotSC' data-wrapper-class='controlgroup-textinput ui-btn order-totSC' type='text' data-mini='true' />"+		
			"						</div>"+
    		"						<div class='ui-block-b'>"+
			"							<div class='ui-bar ui-bar-a' style=''>Tax:</div>"+
			"							<input name='txtTotTax' disabled id='txtTotTax' data-wrapper-class='controlgroup-textinput ui-btn order-totTax' type='text' data-mini='true' />"+		
			"						</div>"+
    		"						<div class='ui-block-c'>"+
			"							<div class='ui-bar ui-bar-a' style=''>Total:</div>"+
			"						</div>"+
    		"						<div class='ui-block-d'>"+
			"							<div class='ui-bar ui-bar-a' style=''>"+			
			"								<input name='txtAllTot' disabled id='txtAllTot' data-wrapper-class='controlgroup-textinput ui-btn order-allTot' type='text' data-mini='true' />"+		
			"							</div>"+
			"						</div>"+
			"					</div>"+
			
			"					<div id='quickFunction' data-role='controlgroup' data-type='horizontal' data-mini='true'>"+
			"						<input name='txtNewQty' id='txtNewQty' data-wrapper-class='controlgroup-textinput ui-btn order-newQty' type='text' placeholder='Qty' data-mini='true' />"+
			"						<a class='ui-btn ui-corner-all ui-icon-search ui-btn-icon-left'>PLU</a>"+
			"						<a class='ui-btn ui-corner-all ui-icon-action ui-btn-icon-left'>Send</a>"+
			"						<a class='ui-btn ui-corner-all ui-icon-print ui-btn-icon-left'>Print</a>"+
			"					</div>"+
			
			"				</div>"+
			"			</div>"+
			"		</div>"+
			"	</div>"+
			"</div>";
		return html;
	},
	createScroll = function(that) {
		var mainPageScroll = new IScroll('#main-page-content', {
			probeType: 3,
			stopImmediatePropagation: false,		
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			snap: true,
			snapSpeed: 400,
			bounce: false,
			preventDefault: false,
			mouseWheel: false,
			scrollbars: false,
			fadeScrollbars: false,
			toggleFixedHeader: false
		});
		
		mainPageScroll.on('scrollStart', function(e) {
			//scrollLog('start',mainPageScroll);
			if (mainPageScroll.x === 0 && mainPageScroll.directionX === -1) {}
			else if (mainPageScroll.x < 0 && mainPageScroll.startX === mainPageScroll.x && mainPageScroll.directionX === 1) {}
			else {
				//$("#main-page-header").fadeOut('fast');
				if (!mainPageScroll.toggleFixedHeader) {			
					mainPageScroll.toggleFixedHeader = true;
					$("#main-page-header").animate({ opacity: 0, top: '-2.7em' }, {duration: 200});
				}
			}
		});
		
		mainPageScroll.on('scrollEnd', function(e) {
			//scrollLog('end',mainPageScroll);
			//$("#main-page-header").fadeIn('fast');
			if (mainPageScroll.toggleFixedHeader) {
				$("#main-page-header").animate({ opacity: 1, top: 0 }, {duration: 200});
				mainPageScroll.toggleFixedHeader = false;
				if (mainPageScroll.currentPage.pageX === 1)
					that.doActiveSearch('#menuTab');
				else {
					if(that.activeTab === undefined)
						that.doActiveSearch('#tableTab');
					else
						that.doActiveSearch(that.activeTab.data('tab'));
				}
			}
		});	
		
		return mainPageScroll;
	};

	if (typeof exports !== 'undefined') exports.mainPageView = mainPageView;
	else window.mainPageView = mainPageView;

})(window,jQuery);