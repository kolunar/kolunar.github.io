
function getLeftMenu(id){
	return	"<div data-role='panel' data-display='overlay' data-swipe-close='true' id='"+id+"'>"+
			"	<div class='panel-scrollwrapper'>"+
			"		<div class='panel-scrollcontent'>"+
			"			<h3>Account</h3>"+
			"			<ul>"+
			"				<li class='active'><a href='#' class='contentLink'>AML</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Change Password</a></li>"+			
			"				<li><a href=\"#home\" class=\"contentLink\">Log Out</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Reload</a></li>"+	
			"				<li><a href=\"#home\" class=\"contentLink\">Exit</a></li>"+				
			"			</ul>"+
			"			<h3>System</h3>"+
			"			<ul>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Change Language</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Shift Start</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Shift End</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Station Message</a></li>"+
			"				<li>"+
			"					<a href='#popupMenu-theme' data-rel='popup' data-transition='pop' class='contentLink'>Change Theme</a>"+
			"					" + getLeftMenuPopUp() +
			"				</li>"+			
			"			</ul>"+
			"			<h3>More</h3>"+
			"			<ul>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Daily Start</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Daily End</a></li>"+
			"				<li><a href=\"#home\" class=\"contentLink\">Station Message</a></li>"+
			"			</ul>"+			
			"		</div>"+
			"	</div>"+
			"</div>";
}
            

function getLeftMenuPopUp(){
	return	"<div data-role='popup' id='popupMenu-theme'>"+
			"	<ul data-role='listview' data-inset='true' style='min-width:210px;'>"+
            "		<li data-role='list-divider'>Choose a theme</li>"+
            "		<li><a href='#'>Theme A</a></li>"+
			"		<li><a href='#'>Theme B</a></li>"+
            "		<li><a href='#'>Theme C</a></li>"+
            "		<li><a href='#'>Theme D</a></li>"+
			"	</ul>"+
			"</div>";
}
