/*
 *  jQuery Form Watcher - v1.0.0
 *
 *  Made by Christopher Smoak
 *  Under LGPLv3 License
 */
;(function( $ ) {
    $.fn.formWatcher = function( options )
    {
    	// allow user to specify message
    	var settings = $.extend({
            message: 'Your changes have not been saved. Are you sure you want to continue?',
        }, options);

    	// watch every form
        this.filter("form").each(function()
        {
        	var form = $(this),
        		submitting = false;

        	// attach original form data to form
        	form.data('original_data', form.serialize());

        	// update submitting var to allow form to submit 
        	// without throwing onbeforeunload message
        	form.on('submit', function(event)
        	{
        		submitting = true;
        	});
	       	
	       	// stop page reload unless we are submitting
	        window.onbeforeunload = function(event)
			{
				if (form.data('original_data') != form.serialize()
					&& !submitting)
				{
					return settings.message;
				} 
				
			}
	    });

        return this;
    };
}(jQuery));
