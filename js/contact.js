$(document).ready(function(){
  var f = $('form');

  f.submit(function(event){
    event.preventDefault();

    var url = f.attr('action')

    $.post(url, f.serialize(), function(data){
      f.append(data);
    });
  });
});
