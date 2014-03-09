$(document).ready(function(){
	var $clouds = $('#clouds'),
		debounceClouds = _.debounce(function(){
			console.log('bounching clouds')
			$clouds.animate({ top: $(window).scrollTop() + 130 + 'px' }, 1000);
		}, 300, false);

	$(window).scroll(debounceClouds);
	
})