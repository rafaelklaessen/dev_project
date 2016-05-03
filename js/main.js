$(document).ready(function(){
	$('#nav-icon').click(function() {
		$(this).toggleClass('open').toggleClass('active');
		$('.pushmenu-push').toggleClass('pushmenu-push-toright');
		$('.pushmenu-left').toggleClass('pushmenu-open');
	});
});
