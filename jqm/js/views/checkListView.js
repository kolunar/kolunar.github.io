/**
  * ===================================================================================================== 
  * View renders the Model into user interface which gathers dynamic data to create UI context.
  * It's the only part that is allowed to access to the DOM. 
  * It's responsible for applying event listeners to DOM elements.
  * If you want to more clearly separate UI or document markup (HTML) from the BusinessLogic layer 
  * (ie. code-behind), then consider implementing MVVM or MVP pattern.
  * Libraries such as Knockout.js supports MVVM,
  * whereas Backbone.js, Angular.js, Agility.js etc... support MVC pattern.
  * @ref:MVC https://developer.chrome.com/apps/app_frameworks 
  * @ref:MVVM http://knockoutjs.com/documentation/introduction.html
  * @ref:MVVM http://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/
  * @ref:MVVM http://msdn.microsoft.com/en-us/magazine/hh297451.aspx
  * @ref:MVVM http://www.developer-tech.com/news/2012/dec/13/knockoutjs-mvvm-framework-jquery-developers/
  * =====================================================================================================
  * @author aml.nirvasoft@gmail.com  
*/

/*	
===============================================================================
The following Snippet applies Immediately-Invoked Function Expressions (IIFEs),
a self-invoking anonymous function which executes itself in-line immediately.
===============================================================================
*/

(function(window,$){
	var dummy = function(){
		alert('hi');
	},
	//Constructor
	checkListView = function(wrap,id,model){
		var self = this,e,
		initWidget = function(){
			var l,html;

			html =	"<ul id='"+id+"' class='list' "+
					"data-role='listview' "+
					"data-filter='true' "+
					"data-input='#pre-rendered-checkList-filterable' "+
					"data-inset=\"true\">";
			
			html += "</ul>";
			return html;
		};

		self.model = model;
		self.wrapper = $(wrap);
		self.wrapper.append(initWidget());
		//self.content = self.wrapper.children[0];
		self.content = self.wrapper.find('#'+id);
		
		self.checkListScroll = new IScroll('#checkListScroll', {
			scrollX: false,
			scrollY: true,
			snap: false,
			bounce: true,
			momentum: true,
			preventDefault: true,
			mouseWheel: false,
			scrollbars: true,
			fadeScrollbars: true,
			firstTimeScroll: true
		});

		$(wrap).off().on("tap", "#"+id+" > li:not(#no-results)", function(e){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			self.model.activeItem = self.model.data[$(this).data('index')];
			
			OrderController.Actions.Check.read('001');
			//alert($(this).html());
		});
		
		self.refreshScroll = function(){
			if(self.checkListScroll !== undefined)
				self.checkListScroll.refresh();
				//self.checkListScroll.scrollTo(0, 0);
		};
		
		//self.activeItem;
		self.bind = function(){
			var html = '';
			for (i = 0,l = self.model.checklist.length; i < l; i++) {
				html += self.createLi(i,self.model.checklist[i]);
			}
			if(html === ''){
				html += "<li id='no-results'>No results found.</li>";
			}
			self.content.html(html);
			self.wrapper.trigger("create");
			self.content.listview('refresh');
			self.refreshScroll();
			//self.content.trigger("listviewcreate");			
		};		

		//dummy();
		//alert('mod loaded');
	};
	
	// Prototype
	checkListView.prototype = {
		visible: true,
		show:function(){
			var self = this;
			self.wrapper.show();
			visible = true;
		},
		hide:function(){
			var self = this;
			self.wrapper.hide();
			visible = false;
		},
		createLi:function(index,item){
			var self = this,
			html =	"<li class='chkitem' data-index="+index+"><a href=\"#\">"+
						item.chkNo+" : "+
						item.tblNo+" : "+
						item.total+" : "+
						item.status+
						"</a></li>";			
			return html;
		}	
	};
	
	if (typeof exports !== 'undefined') exports.checkListView = checkListView;
	else window.checkListView = checkListView;

})(window,jQuery);

