/* tabify */

(function( $ ){
	$.fn.stabit = function() {
		
		var containers = this;
		
		return this.each(function(){
			$(this).find('.tb-tabs a').click(function(e){
				e.preventDefault();
				var curr = e.srcElement || e.target;
				$(curr).closest('ol').children('li').children('a').removeClass('selected').end().end().end().addClass('selected').blur();
				
				// find the closest parent container so we're only working on this tab set
				$(curr).closest(containers).children('.tb-panel').hide();
				
				var path = curr.pathname;
				if (path.indexOf('/') !== 0) {
					// IE bug sometimes misses leading slash
					path = '/' + path;
				};
				
				if (curr.hash !== '' && path === window.location.pathname) { // simple hash+id, show it
					
					$(curr.hash).show();
					
				} else if (path !== window.location.pathname) { // different path, load it
					
					// already loaded before?
					// todo: may want to make caching an option instead of the default
					if (!$(curr.hash).data('loaded')) {
						
						// not loaded yet, load it
						$(curr.hash).show().data('loaded', true).load(curr.href, function(response, status, xhr){
							/* handle your error */
							// if (status == "error") {
							// 	var msg = "Sorry but there was an error: ";
							// 	alert(msg + xhr.status + " " + xhr.statusText);
							// }
						});
						
					} else {
						// was loaded before, don't reload it just show it
						$(curr.hash).show();
					};
				};
			});
		});
		
	};
})( jQuery );
