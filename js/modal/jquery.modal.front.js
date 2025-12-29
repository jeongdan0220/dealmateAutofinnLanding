$(document).ready(function(){
    $('a[rel="ajax:modal"]').click(function(event) {
    
      $.ajax({
    
        url: $(this).attr('href'),
    
        success: function(newHTML, textStatus, jqXHR) {
            $(newHTML).appendTo('body')
            .modal({
                fadeDuration: 200,
                fadeDelay: 0.1
            })
            .on($.modal.AFTER_CLOSE, function(event, modal) {
                modal.elm.remove();
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          
        }
      });
    
      return false;
    });
});