function searchValues() {
    var a = getNum(".min"),
        b = getNum(".max");
    isNaN(a) && (a = 0), isNaN(b) && (b = Number.POSITIVE_INFINITY), sortonPrice(a, b)
}

function getNum(a) {
    return parseInt($(mmContainer + " " + a).val())
}

function search(a) {
    function b(a, b) {
        return $.ajax({
            url: a
        }).done(function(a) {
            count += 1, $.each(a.results, function(b, c) {
                $(".product-container").append('<article class="product"></article>');
                var d = $(".product-container .product:last-child"),
                    e = "No alt found!",
                    f = "&#36;";
                for (x in a.results[b]) {
                    var g = a.results[b][x];
                    switch (x) {
                        case "name":
                            d.append('<h2 class="name">' + g + "</h2>");
                            break;
                        case "picture":
                            d.prepend('<img src="' + g + '" alt="' + e + '"/>');
                            break;
                        case "picture/_alt":
                            e = g;
                            break;
                        case "price":
                            d.append('<div class="price">' + f + '<span class="price_int">' + g + "</span></div>"), d.attr("price", g);
                            break;
                        case "price/_currency":
                            f = "USD" == g ? "&#36;" : "EUR" == g ? "&euro;" : "&#xA3;";
                            break;
                        case "link":
                            d.attr("link", g + "?p=WL2504207536201306OF")
                    }
                }
            }), sortPrice(lastSet), c(), searchValues(), count == b && ($("body").css({
                overflow: "auto"
            }), $(".loading").stop().fadeOut(200))
        }), !0
    }

    function c() {
        $(".product").click(function() {
            link = $(this).attr("link"), "undefined" != typeof link && window.open(link)
        })
    }
    for ($(".product-container").html(""), $("body").css({
            overflow: "hidden"
        }), $(".loading").stop().fadeIn(200), count = 0, i = 0; i < names.length; i++) b(urls[names[i]].call(a), names.length);
    return sortPrice(lastSet), !0
}

function sortPrice(a) {
    try {
        if ("boolean" != typeof a && "undefined" != typeof a) throw "Parameter is not a boolean!";
        return "undefined" == typeof a && (a = !0), lastSet = a, a = 1 == a ? 1 : -1, $(".product-container .product").sort(function(b, c) {
            return $(b).attr("price") * a - $(c).attr("price") * a
        }).appendTo(".product-container"), !0
    } catch (b) {
        return "An error occurred: " + b
    }
}

function sortonPrice(a, b) {
    try {
        if (a > b) throw "The minimum price cannot be higher than the maximum price!";
        if ("number" != typeof a) throw "The minimum number is not a number";
        if ("number" != typeof b && "undefined" != typeof b) throw "The maximum number is not a number";
        return "undefined" == typeof b && (b = Number.POSITIVE_INFINITY), $(".product-container .product").each(function() {
            var c = $(this).attr("price");
            c >= a && b >= c ? $(this).fadeIn(0) : $(this).fadeOut(0)
        }), !0
    } catch (c) {
        return "An error occurred: " + c
    }
}
$(document).ready(function() {
    lastSet = !0;
    var f = $(".search form");
    f.submit(function(a) {
        a.preventDefault(), search($(".search-input").val())
    }), $(".filters .group span").click(function() {
        var t = $(this);
        t.addClass("selected"), t.siblings("span").removeClass("selected"), eval(t.attr("data-execute"))
    }), mmContainer = ".filters .group.sortonprice .input-content", $(mmContainer + " input").keydown(function() {
        searchValues()
    }), $(mmContainer + " input").keyup(function() {
        searchValues()
    })
});
var names = ["banggood"],
    urls = {
        banggood: function() {
            return "https://api.import.io/store/connector/ec51bda1-c64d-4d39-a949-33bd84437c55/_query?input=searchwords:" + this + "&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba"
        },
        gearbest: function() {
            return "https://api.import.io/store/connector/181dc267-ff29-421c-a12e-d316acd5e0b5/_query?input=searchwords:" + this + "&&_apikey=8a3cfc16c0a54e45ad44fc793f5e2825fae9fc9f528a26cd9c1529784cac9dbc60e868c3f3b069cdb58b375773b97fd2da21d09bda6fc34eeccabc08261d252327bb8dfc7e7f0e0c5388b0f598578cba"
        }
    },
    count = 0;
