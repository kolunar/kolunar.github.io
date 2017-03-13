(function(window,$){

	//Constructor
	var tablesView = function(wrap,id,model){
		var self = this,e,
		initWidget = function(json){			
			var l,html;
			
			html =	"<ul id='"+id+"' class='grid' "+
					"data-role='gridview' "+
					"data-filter='true' "+
					"data-input='#pre-rendered-table-filterable' "+
					"data-inset=\"true\">";

			html += "</ul>";
			return html;
		};

		self.model = model;
		self.wrapper = $(wrap);
		self.wrapper.append(initWidget());
		self.content = self.wrapper.find('#'+id);//self.wrapper.children[0];

		self.tableScroll = new IScroll('#tableTab', {
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
		
		self.refreshScroll = function(){
			if(self.tableScroll !== undefined)
				self.tableScroll.refresh();
				//self.tableScroll.scrollTo(0, 0);
		};		

		self.activeItem;
		self.bind = function(){
			var html = '';
			for (i = 0,l = self.model.tables.length; i < l; i++) {
				html += self.createLi(i,self.model.tables[i].desc);//"<li class='ui-btn' data-index="+i+">"+data[i].desc+"</li>";
			}			
			self.content.html(html);
			self.wrapper.trigger("create");
			//self.content.listview('refresh');//we r not using listview here
			self.refreshScroll();			
			//console.dir(self);
			//console.log(self.wrapper.html());
		};

		$(wrap).off().on("tap", "#"+id+" .ui-btn", function(e){
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			self.model.activeItem = self.model.data[$(this).data('index')];
			self.activeItem = $(this);
			//alert($(this).html());
		});

		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	tablesView.prototype = {
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
		createLi:function(i,desc){
			return "<li class='ui-btn' data-index="+i+">"+desc+"</li>";
		}		
	};
	
	if (typeof exports !== 'undefined') exports.tablesView = tablesView;
	else window.tablesView = tablesView;

})(window,jQuery);

