/**
 *	Client side script for ziplink.xyz
 *
 *	Currently handles:
 *	- Opening links from ziplink viewer page
 */

$(document).ready(function(){

	/**
	 *	Handles users clicking on the openAll button
	 */
	$( '#openAll' ).click(function(){
		$( '.ziplink' ).each(function(index, ziplink){
			var newWindow = window.open($(ziplink).attr('href'));

			if(newWindow){
				//window has opened successfully
				newWindow.focus();
			} else {
				//Browser has blocked new window
				//TODO: handle this with html, alerts are bad
				alert('Please allow popups for this website');
			}
		});
	});
});
