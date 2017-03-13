function createUserForm(){
	createHeader("User Info","user");
	$("#footer").html("<div data-role='navbar'><ul>"+
					  "<li><a id='btnNew' data-icon='plus'>New</a></li>"+
					  "<li><a id='btnList' data-icon='grid'>List</a></li>"+
					  "</ul></div>");					  
	$('#footer').closest(":jqmData(role='page')").trigger('pagecreate');
	$("#content").html("<div data-role='fieldcontain'><label for='txtName'>User Name</label>"+
				       "<input id='txtName' type='text'></div>"+
				       "<div data-role='fieldcontain'><label for='txtAppDate'>Apply Date</label>"+
				       "<input id='txtAppDate' type='date'></div>"+				       
				       "<div data-role='fieldcontain'><label for='smType'>Type</label>"+
				       "<select id='smType'><option>-</option><option>High</option><option>Normal</option></select></div>"+
				       "<div data-role='fieldcontain'><label for='txtAddress'>Address</label>"+
				       "<textarea id='txtAddress' type='text'></textarea></div>"+				       
				       "<button id='btnSave' data-theme='b'>Save</button></div>");	
					   $("#content").trigger('create');					   
					   Save();  
					   New();
					   List();
					   fillTodayDate();
					   $("#txtAppDate").val(today);	
}
var today;
function fillTodayDate(){
	today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
	today = yyyy + "-" + mm + "-" + dd;
}
function Save(){
	$('#btnSave').off('tap').on('tap', function(){
		$.mobile.locaing('show');
		var name = $("#txtName").val();
		var address = $("#txtAddress").val();
		var type = $("#smType").val();		
		var appliedDate = $("#txtAppDate").val();
		
		$.getJSON( "save?name="+ name + "&address=" + address + "&type=" + type + "&appliedDate=" + appliedDate ,				
		function(data){	
			if(data.status=="true"){
				$.mobile.loading('hide');
				jsi.successMsg();
			}else{
				$.mobile.loading('hide');
				jsi.failMsg();
			}
	 });
		return false;
	 });
}
function New(){
	$('#btnNew').off('tap').on('tap', function(){	
		createUserForm();
		return false;
	});
}
function List(){
	$('#btnList').off('tap').on('tap', function(){	
		$.mobile.loading('show');
		listUser();
		return false;
	});
}
function listUser(){
	$("#content").html("<ul data-role='listview' id='userList' data-divider-theme='b' data-inset='true'>"+
						"<li data-role='list-divider' role='heading'>User Info</li></ul>");
	$.getJSON( "userinfo.jsp",				
		function(data){		
			$.each(data.user,function(i,val){
				appDate = data.user[i].date;
				yyyy = appDate.substring(0,4);
				mm = appDate.substring(4,6);
				dd = appDate.substring(6,8);
				if(appDate!=""){appDate = dd + "-" + mm + "-" + yyyy;}
				$("#userList").append("<li data-theme='c'><a id='u"+ i +"' data-transition='slide'>"+
									   "<p>Name: "+ data.user[i].name +"</p>"+
									   "<p>Type: "+ data.user[i].type +"</p>"+
									   "<p>Applied Date: "+ appDate +"</p>"+
									   "<p>Address: "+ data.user[i].address +"</p>"+
									   "</a></li>");
				$.mobile.loading('hide');
				$("#u"+i).off('tap').on('tap', function(){
				applyDate = data.user[i].date;
				yyyy = applyDate.substring(0,4);
				mm = applyDate.substring(4,6);
				dd = applyDate.substring(6,8);				
				applyDateForm = yyyy + "-" + mm + "-" + dd;
				createUserForm();
					$("#txtName").val(data.user[i].name);
					$("#txtAppDate").val(applyDateForm);
					$("#smType").val(data.user[i].type);
					$("#smType").selectmenu('refresh');
					$("#txtAddress").val(data.user[i].address);					
					return false;
				});
				
			});
			$('#content').closest(":jqmData(role='page')").trigger('pagecreate');
		});
}
function createMsgForm(){
	doNavigation("Message","user");
}
function createNotiForm(){
	doNavigation("Notification","user");
}
function createDissForm(){
	doNavigation("Discussion","user");
}
function createSettingForm(){
	doNavigation("Setting","user");
}