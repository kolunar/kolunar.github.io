(function(window,$) {
	var dummy = function() {
		alert('hi');
	},
	//Constructor
	mainMenuView = function(wrap,id,model) {
		var self = this,e,data,
		initWidget = function(json) {			
			var l,html;
			
/* 			html =	"<div id='"+id+"' data-role='controlgroup' data-type='horizontal'>";
					//"<input type='text' class='active' />";
			for (i = 0,l = data.length; i < l; i++) {
				//add(values[i]);
				html += "<button class='ui-btn' data-index="+i+">"+data[i].desc+"</button>";
			}
			html += "</div>";
			return html; */
			
			html = "<ul id='"+id+"' class='grid'>";
			for (i = 0,l = data.length; i < l; i++) {
				html += "<li class='ui-btn' data-index="+i+">"+data[i].desc+"</li>";
			}
			html += "</ul>";
			return html;
		};
		
		data = model.mainmenus;
		self.wrapper = $(wrap);
		self.wrapper.append(initWidget());
		self.content = self.wrapper.find('#'+id);
		//self.content = self.wrapper.children[0];
		model.activeItem = data[0];
		
		$(wrap).off().on("tap", "#"+id+" .ui-btn", function(e) {		
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			model.activeItem = data[$(this).data('index')];
			SubMenuController.create();
			//createSubMenu(model.activeItem);
			//alert($(this).html());
		});

		self.createScroll(self,wrap);
		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	mainMenuView.prototype = {
		visible: true,
		headers: [],
		show: function() {
			var self = this;
			self.wrapper.show();
			visible = true;
		},
		hide: function() {
			var self = this;
			self.wrapper.hide();
			visible = false;
		},
		bind: function(data) {
			alert('binding mainmenu...size:'+data.length);
			var self = this,html = '';
			for (i = 0,l = data.length; i < l; i++) {
				html += "<li class='ui-btn' data-index="+i+">"+data[i].desc+"</li>";
			}
			self.content.html(html);			
		},
		createScroll: function(that, wrap) {
			that.mainMenuScroll = new IScroll(wrap, {	
				probeType: 3,
				stopImmediatePropagation: false,
				eventPassthrough: false,
				scrollX: true,
				scrollY: false,
				momentum: true,
				snap: false,
				bounce: false,
				preventDefault: true,
				mouseWheel: false,
				scrollbars: true,
				fadeScrollbars: true,
				firstTimeScroll: true
			});
			
			that.mainMenuScroll.on('beforeScrollStart', function(e) {
				console.log('beforeScrollStart \n');
				//scrollLog('',that.mainMenuScroll);
				if (that.mainMenuScroll.options.firstTimeScroll) {
					if (MainPageController.view.mainPageScroll !== undefined)
						MainPageController.view.mainPageScroll.enabled = false;	
					that.mainMenuScroll.options.firstTimeScroll = false;
					that.mainMenuScroll.refresh();
				}
				else {
					if (MainPageController.view.mainPageScroll !== undefined)
						MainPageController.view.mainPageScroll.enabled = that.mainMenuScroll.startX === that.mainMenuScroll.maxScrollX;		
				}
			});

			that.mainMenuScroll.on('scrollStart', function(e) {
				console.log('scrollStart \n');
				//MainPageController.view.mainPageScroll.enabled = false;
				that.mainMenuScroll.options.stopImmediatePropagation = true;
				//scrollLog('',that.mainMenuScroll);
			});
			that.mainMenuScroll.on('scroll', function(e) {
				//console.log('scroll \n');
				//scrollLog('',that.mainMenuScroll);
			});
			that.mainMenuScroll.on('scrollEnd', function(e) {
				console.log('scrollEnd \n');
				//scrollLog('',that.mainMenuScroll);
				
				that.mainMenuScroll.options.stopImmediatePropagation = false;
				
				if (that.mainMenuScroll.x === 0 && that.mainMenuScroll.directionX !== 1)
					$('#mainMenu').removeClass('noSwipe');
				else {
					if (!$('#mainMenu').hasClass('noSwipe'))
						$('#mainMenu').addClass('noSwipe');
				}
				setTimeout(function(){
					if (MainPageController.view.mainPageScroll !== undefined)
						MainPageController.view.mainPageScroll.enabled = true;
				},500);
			});		
		}
	};
	
	if (typeof exports !== 'undefined') exports.mainMenuView = mainMenuView;
	else window.mainMenuView = mainMenuView;

})(window,jQuery);
