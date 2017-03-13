(function(window,$){
	var dummy = function(){
		alert('hi');
	},
	//Constructor
	subMenuView = function(wrap, id, model, lookup, doSubMenuClick){
		var self = this,e,data,
		initWidget = function() {
			var l,html;
			
/* 			html =	"<div id='"+id+"' data-role='controlgroup' data-type='horizontal'>";
			for (i = 0,l = data.length; i < l; i++) {
				//add(values[i]);
				if(data[i].psk === lookup.sk)
					html += "<button class='ui-btn' data-index="+i+">"+data[i].desc+"</button>";
			}			
			html += "</div>";
			return html; */
			html =	"<ul id='"+id+"' class='grid' "+
					"data-role='gridview' "+
					"data-filter='true' "+
					"data-input='#pre-rendered-menu-filterable' "+
					"data-inset=\"true\">";
					
			//html = "<ul id='"+id+"' class='grid' data-inset=\"true\">";
			for (i = 0,l = data.length; i < l; i++) {
				if(data[i].psk === lookup.sk)
					html += "<li class='ui-btn' data-index="+i+">"+data[i].desc+"</li>";
			}
			html += "</ul>";
			return html;
		};

		data = model.submenus;
		self.wrapper = $(wrap);
		//self.wrapper.html("");
		self.wrapper.html(initWidget());
		self.content = self.wrapper.find('#'+id);//.children[0];
		//self.activeItem;
		

		$(wrap).off().on("tap", "#"+id+" .ui-btn", function(e){
			//e.stopImmediatePropagation();
			//e.stopPropagation();
			//e.preventDefault();
			model.activeItem = data[$(this).data('index')];
			console.dir(model.activeItem);
			//alert($(this).html());
			doSubMenuClick();
		});

		self.createScroll(self,wrap);
		//dummy();
		//alert('mod loaded');
	};
	
	// Prototype
	subMenuView.prototype = {
		visible: true,
		headers: [],
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
		bind: function(data,lookup){
			//alert('binding submenu...size:'+data.length+',lookupSK:'+lookup.sk);
			var self = this,html = '';
			for (i = 0,l = data.length; i < l; i++) {
				if(data[i].psk === lookup.sk)
					html += "<li class='ui-btn' data-index="+i+">"+data[i].desc+"</li>";
			}
			self.content.html(html);
			self.wrapper.trigger("create");
			self.refreshScroll(self);
			//console.dir(self);
			//console.log(self.wrapper.html());
		},
		createScroll: function(that, wrap) {
			if (that.subMenuScroll !== undefined) {
				that.refreshScroll(that);
			}
			else {
				that.subMenuScroll = new IScroll(wrap, {
					scrollX: false,
					scrollY: true,
					snap: false,
					bounce: false,
					momentum: true,
					preventDefault: true, 
					mouseWheel: false ,
					scrollbars: true,
					fadeScrollbars: true,
					firstTimeScroll: true
				});
				
				that.subMenuScroll.on('beforeScrollStart', function(e){
					if(that.subMenuScroll.options.firstTimeScroll){
						that.subMenuScroll.options.firstTimeScroll = false;
						that.subMenuScroll.refresh();
					}
				});
			}
		},
		refreshScroll: function(that){
			//setTimeout(function(){
				that.subMenuScroll.refresh();
				if (MainPageController.view.mainPageScroll !== undefined)
					MainPageController.view.mainPageScroll.enabled = true;
				//that.subMenuScroll.scrollTo(0, 0);
				console.log('that.subMenuScroll.refresh()');
			//},500);		
		}
	};
	
	if (typeof exports !== 'undefined') exports.subMenuView = subMenuView;
	else window.subMenuView = subMenuView;

})(window,jQuery);

