set_currency = 'USD';

$(document).ready(function() {
  //For keeping the way of sorting (cheap-expensive or expensive-cheap), default: true;
  lastSet = true;

  var f = $('.search form');
  //Must be focussed so that the document won't go out of view (because other inputs still can be selected)
  $('.search form .search-input').focus();
  //Document must scroll to the top to fix issues
  $(document).scrollTop(0);

  f.submit(function(event) {
    event.preventDefault();

    var val = $('.search form .search-input').val();

    if (val.trim() != '') {
      search(val);
      animateResults();
      $('.search .intro-title').css({'z-index' : '1'});
    }

  });

  $('.filters-collapsed ul li').click(function() {
    var t = $(this);

    //Soring
    if (t.is('[sorting]')) {
      var tind = t.find('.indication'),
          icon = t.find('img');

      if (t.attr('sorting') == 'high') {
        sortPrice(false);
        t.attr('sorting', 'low');
        tind.text('High-Low');
        icon.addClass('rotated');
      } else {
        sortPrice(true);
        t.attr('sorting', 'high');
        tind.text('Low-High');
        icon.removeClass('rotated');
      }
    } else if (t.is('[toggle-filters]')) {
      f = $('.filters');

      if (f.hasClass('is-open')) {
        t.removeClass('selected');
        f.removeClass('is-open');
        f.stop().slideUp(400);
        $('.loading').css({'top' : '0'});
      } else {
        t.addClass('selected');
        f.addClass('is-open');
        f.stop().slideDown(400);
        $('.loading').css({'top' : f.css('max-height')});
        $(window).resize(function() {
          if(f.hasClass('is-open'))  $('.loading').css({'top' : f.css('max-height')});
        });
      }

    }

  });

  mmContainer = '.filters .sortonprice .input-content';

  $(mmContainer + ' input').keydown(function() {
    searchValues();
  });

  $(mmContainer + ' input').keyup(function() {
    searchValues();
  });

  //Selecting websites
  $('.filters .site-select li').click(function() {
    var shop =  $(this).text().toLowerCase(),
        index = shops.indexOf(shop);

    $(this).toggleClass('selected');

    if (index == -1){
      shops.push(shop);
    } else {
      shops.splice(index, 1);
    }

    filterShops();

  });

  //Setting default payment method as selected
  $('.filters .currency li[currency=' + set_currency + ']').addClass('selected');

  //Selecting payment method
  $('.filters .currency li').click(function() {
    var payment =  $(this).text().toLowerCase();

    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');

    set_currency = $(this).attr('currency');

    convertPrices();

  });

  filterShops();

});

function animateResults() {
  $('.filters .sortonprice input').attr('tabindex', '1');
  $('.search').addClass('search-activated');
  $('.search form input.submit-btn').val('');
  $('.filters-collapsed').addClass('filters-activated');
  $('.results').addClass('results-activated');
}

var names = ['banggood', 'gearbest', 'aliexpress', 'miniinthebox', 'lightinthebox'],
    shops = ['banggood', 'gearbest', 'aliexpress', 'miniinthebox', 'lightinthebox'];

var urls = {
  banggood : function() {
    return 'https://api.import.io/store/connector/f9f855c7-2d72-4a77-a867-1bbbfaae29b8/_query?input=searchwords:' + this + '&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba';
  },
  gearbest : function() {
    return 'https://api.import.io/store/connector/181dc267-ff29-421c-a12e-d316acd5e0b5/_query?input=searchwords:' + this + '&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba';
  },
  aliexpress : function() {
    return 'https://api.import.io/store/connector/ebeff208-6fc7-4d04-9fe7-638efd277b9d/_query?input=searchwords:' + this + '&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba';
  },
  miniinthebox : function() {
    return 'https://api.import.io/store/connector/328490e1-d1e8-4bdc-b447-673e5cbcdc6f/_query?input=searchwords:' + this + '&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba';
  },
  lightinthebox : function() {
    return 'https://api.import.io/store/connector/f27d6b91-f76c-40b2-aa35-8c24871debdb/_query?input=searchwords:' + this + '&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba';
  }
}

function convertPrices() {

  $('.product-container .product').each(function() {
    var cur = $(this).find('.price .price_currency'),
        c = cur.text(),
        p_int = $(this).find('.price .price_int'),
        amount = p_int.text(),
        convertFrom = 'USD';

    switch (c) {
      case '$' :
        convertFrom = 'USD';
        break;
      case '€' :
        convertFrom = 'EUR';
        break;
      case '£' :
        convertFrom = 'GBP';
        break;
    }

    //Must be in a different function, otherwise only one price is taken for conversion.
    convertRate(convertFrom, amount, p_int);

    switch (set_currency) {
      case 'USD' :
        cur.html('&#36;');
        break;
      case 'EUR' :
        cur.html('&euro;');
        break;
      case 'GBP' :
        cur.html('&#xA3;');
        break;
    }

  });

}

function convertRate(convertFrom, amount, p_int) {

  $.getJSON("http://api.fixer.io/latest?base=AUD", function(data) {
    fx.rates = data.rates;
    r = fx(amount).from(convertFrom).to(set_currency).toFixed(2);
    p_int.text(r);
    p_int.parents('.product').attr('price', r);
    //If there was a search, there must be searched again to correct price differences.
    searchValues();
  });

}

function filterShops() {
  $('.product-container [shop]').each(function() {
    if (shops.indexOf($(this).attr('shop')) != -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });

  //The items must be sorted on price again, otherwise you'll see wrong items
  searchValues();

}

function searchValues() {
  var min = getNum('.min'),
      max = getNum('.max');

  if (isNaN(min)) min = 0;
  if (isNaN(max)) max = Number.POSITIVE_INFINITY;

  sortonPrice(min, max);

}

function getNum(name) {
  return parseInt($(mmContainer + ' ' + name).val());
}

var count = 0;

function search(search) {
  search = encodeURI(search);

  try {

    if (names.length == 0) throw "There are no sites selected!"

    //Clearing container
    $('.product-container').html('');

    //Showing loading screen
    $('body').css({'overflow-y' : 'hidden'});
    $('.loading').stop().fadeIn(200);

    count = 0;

    for (i = 0; i < names.length; i++){
      var n = names[i];

      showResults(urls[n].call(search), names.length, n);

    }

    function showResults(u, l, n) {
      $.ajax({url: u}).done(function(data){
        count = count + 1;

        $.each(data.results, function(i) {
          $('.product-container').append('<article class="product"></article>');
          var last = $('.product-container .product:last-child'),
              alt = 'No alt found!',
              priceTag = '',
              currency = '&#36;',
              x;

          last.attr('shop', n);

          for(x in data.results[i]) {

            var r = data.results[i][x];

            switch (x) {
              case 'name':
                last.append('<h2 class="name">' + r + '</h2>');
                alt = r;
                break;
              case 'picture':
                last.prepend('<figure bg="' + r + '" title="' + alt + '"></figure>');
                break;
              case 'price':
                last.append('<div class="price"><span class="price_currency">' + currency + '</span><span class="price_int">' + r + '</span><span class="price_tag">' + priceTag + '</span></div>');
                last.attr('price', r);
                break;
              case 'price/_currency':
                if (r == 'USD'){
                  currency = '&#36;';
                } else if (r == 'EUR'){
                  currency = '&euro;';
                } else {
                  currency = '&#xA3;';
                }
                break;
              case 'pricetag':
                priceTag = ' ~ ' + r;
                break;
              case 'link':
                last.attr('link', r + '?p=WL2504207536201306OF');
                break;
            }
          }
        })

        //These things must be called
        sortPrice(lastSet);
        //Must be called, otherwise links won't be opened
        openLink();
        //If the user has given a price sorting it must be applied too
        searchValues();
        //Shops still need to be filtered
        filterShops();
        //The URLs of GearBest products must be corrected (to prevent some wrong linking)
        correctURLs();
        //Hover effects must be added!
        addHover();
        //Images must be set
        setImages();
        //Products must have the right size
        setProductSize();

        //Hiding loading screen and running required stuff
        if (count == l) {
          $('body').css({'overflow-y' : 'auto'});
          $('.loading').stop().fadeOut(200);
          $('.product-container .product').append('<div class="hover-overlay"></div>');
          convertPrices();
        }
      });

      return true;
    }

    //Sort items on price
    sortPrice(lastSet);

    //Makes products clickable
    function openLink() {
      $('.product').click(function() {
        link = $(this).attr('link');

        if (typeof link != 'undefined') {
          window.open(link);
        }
      });
    }

    return true;
  } catch (err) {
    return err;
  }
}

//Sets the size of products
function setProductSize() {
  $('.product-container .product').each(function() {
    var width = $('.product').eq(0).width();

    $(this).height(width * 1.5);
  })
}

//Must be called when the window resizes
$(window).resize(function() {
  setProductSize();
});

//Sets images (for .product only!)
function setImages() {
  $('.product-container .product figure').each(function() {
    var img = $(this).attr('bg');

    $(this).css({'background-image' : 'url(' + img + ')'});
  })
}

//Adds hover effects to products
function addHover() {
  var p = $('.product-container .product');

  //Add hover-overlay element if it isn't there yet
  p.each(function(){
    if ($(this).children().find('.hover-overlay').length) {
      p.append('<div class="hover-overlay"></div>');
    }
  });

  var s;

  p.hover(
    function() {
      $(this).find('figure').css({'transform' : 'scale(1.05)'})
      $(this).find('.hover-overlay').stop().fadeIn(400);
    },
    function() {
      $(this).find('figure').css({'transform' : 'scale(1)'})
      $(this).find('.hover-overlay').stop().fadeOut(400);
    }
  );
}

//Correct URL when the shop is gearbest
function correctURLs() {
  $('.product[shop=gearbest]').each(function() {
    var orgLinks = $(this).attr('link'),
        newLinks = orgLinks.split(',');

    $(this).attr('link', newLinks[0]);
  });
}

//Sort items on price (cheap to expensive or expensive to cheap)
function sortPrice(d) {
  try {
    if (typeof d != 'boolean' && typeof d != 'undefined') throw 'Parameter is not a boolean!'
    if (typeof d == 'undefined') d = true;

    lastSet = d;

    if (d == true) {
      d = 1;
    } else {
      d = -1;
    }

    $('.product-container .product').sort(function(a, b) {
      return $(a).attr('price') * d - $(b).attr('price') * d;
    }).appendTo('.product-container');

    return true;
  } catch(err) {
    return 'An error occurred: ' + err;
  }
}

//Sorts on price (minimum and maximum)
function sortonPrice(min, max) {
  try {
    //Looks if there are any errors with the parameters
    if (min > max) throw 'The minimum price cannot be higher than the maximum price!';
    if (typeof min != 'number') throw 'The minimum number is not a number';
    if (typeof max != 'number' && typeof max != 'undefined') throw 'The maximum number is not a number';
    if (typeof max == 'undefined') max = Number.POSITIVE_INFINITY;

    $('.product-container .product').each(function(){
      var p = $(this).attr('price');

      if (p >= min && p <= max) {
        if (shops.indexOf($(this).attr('shop')) != -1) $(this).show();
      }else{
        $(this).hide();
      }
    })

    return true;

  } catch(err) {
    return 'An error occurred: ' + err;
  }
}
