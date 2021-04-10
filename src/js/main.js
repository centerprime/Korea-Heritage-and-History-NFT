
// MAIN MENU //

$(function() {
	
	$('#mmenu li.parnt') .css('height', '11px');
	
	$('#mmenu li') .hover(function() {
		$(this) .stop() .animate({marginLeft: "10px"}, 250);
	},
	function() {
		$(this) .stop() .animate({marginLeft: "0px"}, 250);
	});
	
});



function viewerMINING() {
    document.getElementById("panel").style.display = "block";
  }


