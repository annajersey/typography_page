jQuery(".topPanelItem").click(function(){
    jQuery(this).find(".dropDownMenu").slideToggle("fast")})
jQuery(".dropDownValue .dropDownMenu div").click(function(){
    jQuery(this).parents(".topPanelItem").find("span.value").html(jQuery(this).html())});

