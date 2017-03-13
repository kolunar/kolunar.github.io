(function(window,$){
	var dummy = function(){
		alert('hi');
	},
	//Constructor
	modifier = function(wrap,id,json){
		var that = this,e,
		doForm = function(json){			
			var l,html,data;
			data = eval('(' + json + ')');
			html =	"<div><div id='"+id+"'><div class='left' data-role='controlgroup' data-type='horizontal'>";
					//"<input type='text' class='active' />";
			for (i = 0,l = data.length; i < l; i++) {
				//add(values[i]);
				html += "<button class='ui-btn'>"+data[i].desc+"</button>";
			}
			html += "</div>";
			html += "<div class='right'></div></div></div>";
			return html;
		},
		doNum = function(s){
			e = $("html > body > "+wrap+" > div > #"+id+" input.active")[0];
			var r = e.val();
			e.val(s=="&lt;&lt;"?((r.length>0)?(r.substring(0, r.length-1)):""):r+s);
		};
		that.wrapper = $(wrap);
		that.wrapper.append(doForm(json));
		that.content = that.wrapper.children[0];
		that.rightArea = $("html > body > "+wrap+" > div > #"+id+" div.right");
		that.leftArea = $("html > body > "+wrap+" > div > #"+id+" div.left");
		
		$(document).on("mousedown", "html > body > "+wrap+" > div > #"+id+" button.pos-NumberButton", function(){
			alert('hi');
			doNum($(this).html());
		});

		//dummy();
		//alert('mod loaded');
	};
	// Prototype
	modifier.prototype = {
		visible: true,
		headers: [],
		show:function(){
			var that = this;
			that.wrapper.show();
			visible = true;
		},
		hide:function(){
			var that = this;
			that.wrapper.hide();
			visible = false;
		},
		showLeft:function(){
			var that = this;
			that.rightArea.hide();
			that.leftArea.show();
		},
		showRight:function(){
			var that = this;
			that.leftArea.hide();
			that.rightArea.show();
		}
	};
	
	if (typeof exports !== 'undefined') exports.modifier = modifier;
	else window.modifier = modifier;	
	
})(window,jQuery);

$(document).on("tap, click", "div.left button.ui-btn", function(e){
	e.stopImmediatePropagation();
	e.stopPropagation();
	e.preventDefault();
	alert($(this).html());
});