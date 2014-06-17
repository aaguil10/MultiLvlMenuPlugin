

(function ( $ ) {
	//Top level function that makes the list click able
    $.fn.multLvlMenu = function() {
		var original = $(this).find("ul").first();
		console.log("original: " + original.attr( "id" ));
		//var a_menu = original.children().first();
		original.children().hide();
		//a_menu.show();
		original.find("ul").each(function() {  //find every sub list and apply properties
				$(this).hide();
				$.fn.multLvlMenu.movefoward( $(this), original );
		});
		var menu_button = $(this).find("button").first();
		console.log("menu_button: " + menu_button.attr( "id" ));
		menu_button.click(function() {
			console.log("I was clicked!");
			original.children().show();
			original.find("ul").each(function() { 
				$(this).hide();
			});
			$(this).siblings().show();
			//$(this).show();
			//a_menu.hide();
			return false;
		});
		original.mouseleave(function() { //reverts first level menu back to a button
			//$(this).children().hide();
			//$(this).children().first().show();
		});
		//$.fn.multLvlMenu.scroll( original ); 
        return this;
    };
	
	//makes the menu move forward and calls function to make menu move back 
	$.fn.multLvlMenu.movefoward = function(ul_curr, orig){
		var a_back = ul_curr.children().first().children().first();
		var a_curr = ul_curr.parent().children().first();
		var parent_ul = ul_curr.parent().parent();
		//setup back button
		a_back.click(function() {
			$.fn.multLvlMenu.moveBack(ul_curr, orig);
			return false;
		});
		//$.fn.multLvlMenu.revertBack(ul_curr, orig);
		//show next list of items
		a_curr.click(function() {
			$.fn.multLvlMenu.scroll( ul_curr ); //make scrollable
			orig.find("ul").each(function() {
				$(this).show();
			});
			ul_curr.parent().siblings().hide();
			//var parents = ul_curr.parent().parent().first().attr( "id" );
			//console.log("parents: " + parents);
			//parents.hide();
			a_curr.hide();
			ul_curr.find("ul").each(function() {
				$(this).hide();
			});
			return false;
		});
	};
	
	//Makes you move back to previous list menu.
	$.fn.multLvlMenu.moveBack = function(ul_curr, orignal){
		var parent_ul = ul_curr.parent().parent();
		var parent_a = ul_curr.parent().first().children().first();
		parent_ul.children().show(); //show parent list
		parent_a.show();
		parent_a.children().find("text").show();
		console.log("parent_a: " + parent_a.attr( "id" ));
		ul_curr.hide(); //hide everything else
		parent_ul.find("ul").each(function() {
			$(this).hide();
		});
		//orignal.children().first().hide();
	};

	$.fn.multLvlMenu.revertBack = function(ul_curr, orignal){
		ul_curr.mouseleave(function() {
			var parent_ul = ul_curr.parent().parent();
			var parent_a = ul_curr.parent().first().children().first();
			parent_ul.children().show(); //show parent list
			parent_a.show();
			ul_curr.hide(); //hide everything else
			parent_ul.find("ul").each(function() {
				$(this).hide();
			}); 
			orignal.children().hide();
			orignal.children().first().show();

		});
	};
	//makes the list scroll when mouse is hovering
	$.fn.multLvlMenu.scroll = function(ul_curr){
		var maxHeight = 200;
		var $container = ul_curr,
		$list = $container, //makes it easier to read the difference from container and list.
        $anchor = $container.find("a"),
        height = $list.height() * 1.1,       // make sure there is enough room at the bottom
        multiplier = height / maxHeight;
		$container.data("origHeight", $container.height());
		if (multiplier > 1) {	// don't do any animation if list shorter than max
            $container.css({
                height: maxHeight,
                overflow: "hidden"
            })
			.mousemove(function(e) {
                var offset = $container.offset();
				var multiply = ($list[0].scrollHeight * 1.1) / 200;
                var relativeY = ((e.pageY - offset.top) * multiply) - ($container.data("origHeight") * 1.2);
				var finalTopValue = -( relativeY  + 1*$container.data("origHeight"));
				$list.children().css("top", finalTopValue );	//moves list
            });
		}
	};
}( jQuery ));



