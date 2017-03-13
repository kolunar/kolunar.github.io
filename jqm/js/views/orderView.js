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

(function(window,$) {
	var dummy = function() {
		alert('hi');
	},
	//Constructor
	orderView = function(wrap, id, model) {
		var self = this,e,
		initWidget = function(){
			var l,html;

			html =	"<ul id='"+id+"' data-role='listview'></ul>";
			html +=	"<div id='order-empty-space'>&nbsp;</div>";
			//html +=	"<input type='text' name='txtNewQty' id='txtNewQty' data-wrapper-class='order-newQty' placeholder='Qty' data-mini='true' />";

			return html;
		};

		self.model = model;
		self.wrapper = $(wrap);
		self.wrapper.append(initWidget());
		//self.content = self.wrapper.children[0];
		self.content = self.wrapper.find('#'+id);
		
		self.orderScroll = new IScroll('#orderListScroll', {
			scrollX: false,
			scrollY: true,
			snap: false,
			bounce: true,
			preventDefault: true,
			mouseWheel: false,
			scrollbars: true,
			fadeScrollbars: true
		});

		self.refreshScroll = function() {
			if(self.orderScroll !== undefined)
				self.orderScroll.refresh();
				//self.orderScroll.scrollTo(0, 0);
		};
		
		self.activeItem;

		$(wrap).off().on("tap, click", "#"+id+" > li", function(e) {
			//e.stopImmediatePropagation();
			//e.stopPropagation();
			//e.preventDefault();
			self.model.activeItem = self.model.data[$(this).data('index')];
			self.activeItem = $(this);
			//alert(self.activeItem);
			//alert($(this).html());
		});

		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	orderView.prototype = {
		visible: true,
		htmls: '',
		show: function() {
			var self = this;
			self.wrapper.show();
			self.visible = true;
		},
		hide: function() {
			var self = this;
			self.wrapper.hide();
			self.visible = false;
		},
		refresh: function() {
			var self = this;
			self.wrapper.trigger("create");
			self.content.listview('refresh');
			self.refreshScroll();			
		},
		createLi: function(index,item) {
			var self = this,		
			html =	"<li data-index="+index+">"+
					"	<input type='text' class='order-input-qty' data-wrapper-class='order-input qty ui-btn ui-mini' value='00.00' >"+
					"	<input type='text' disabled data-wrapper-class='order-input desc ui-btn ui-mini' value='"+item.desc+"' >"+
					"	<input type='text' disabled data-wrapper-class='order-input price ui-btn ui-mini' value='"+item.price+"' >"+
					"	<input type='text' class='order-input-total' disabled data-wrapper-class='order-input total ui-btn ui-mini' value='00000.00' >"+
					"	<label class='order-checkbox lbl-checkbox-notext' data-iconpos='notext'>"+
					"		<input type='checkbox' />"+
					"	</label>"+
					"</li>";
			return html;
		},
		bind: function() {
			//alert('binding...order');
			var self = this,html = '';
			for (i = 0,l = self.model.details.length; i < l; i++) {
				html += self.createLi(i,self.model.details[i]);
			}
			self.content.html(html);
			self.refresh();
			self.content.find('.order-input-qty').number(true, 2);
			self.content.find('.order-input-total').number(true, 2);			
			//self.content.trigger("listviewcreate");		
		},		
		append: function(item) {
			//console.dir(item);
			var self = this,
			html = self.createLi(self.content.children().length,item);
			self.content.append(html);
			self.model.details.push(item);
			self.refresh();
			
			//$('.order-input-qty:eq('+index+')').number(true, 2);
			//$('.order-input-qty').eq(index).number(true, 2);
			self.content.find('.order-input-qty').eq(self.content.children().length-1).number(true, 2);
			self.content.find('.order-input-total').last().number(true, 2);
			
			//console.dir(self.model.details);
			//self.wrapper.trigger("create");
			//self.content.listview('refresh');
			//self.content.trigger("listviewcreate");
		},
		remove: function(index) {
			var self = this;
			self.content.children().eq(index).hide().remove();
			self.model.remove(index);
/* 			self.wrapper.trigger("create");
			self.content.listview('refresh');
			self.content.trigger("listviewcreate");	 */
			//console.dir(self.model.details);
			//console.log(self.content.html());
		},
		replaceNormal: function(index,item) {
			self.model.details.splice(index,1,{"app":"goodbyeworld","message":"cya"});
		},
		replaceSub: function(pIndex,cIndex,item) {
			//TODO::
		}
	};
	
	if (typeof exports !== 'undefined') exports.orderView = orderView;
	else window.orderView = orderView;

})(window,jQuery);

