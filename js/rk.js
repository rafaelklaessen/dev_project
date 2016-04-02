var rk = new rk();

function rk() {
  this.import = function(u) {
    var d;

    $.ajax({
      url: u,
      success: function(data) {
        d = data;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        d = errorThrown;
      }
    });

    return d;
  }

}
