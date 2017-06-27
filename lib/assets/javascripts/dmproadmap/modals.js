$(document).ready(function(){
  $("[data-toggle='modal']").click(function(e){
    e.preventDefault();
    var self = $(this),
        target = '';
    
    if($(this).prop('tagName') == 'a'){
      target = new URL($(this).prop('href')).hash;
    }else{
    	target = $(this).attr('href');
    }
    
    $(target).dialog({
      modal: true,
      width: ($(self).attr('dialog-width') == undefined ? 'auto' : $(self).attr('dialog-width')),
      title: $(self).html(),
      
      open: function(e, ui){
        $("button.ui-dialog-titlebar-close").remove();
        $(".ui-dialog-titlebar").append('<span class="fa fa-close modal-close"></span>');
        
        $("span.modal-close").click(function(e){
          e.preventDefault();
          $(this).parent(".ui-dialog-titlebar").siblings("div.modal").dialog('close');
        });
      }
    });
  });
});