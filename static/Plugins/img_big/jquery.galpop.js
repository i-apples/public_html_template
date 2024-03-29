!
    function(e) {
        "use strict";
        var a, t, o, n, i, l, r, p, d, c, s, u = {},
            g = {
                arrowKeys: !0,
                controls: !0,
                loop: !0,
                maxWidth: null,
                maxHeight: null,
                maxScreen: 90,
                updateRsz: !0,
                callback: null,
                lockScroll: !0,
                contentType: "image",
                AJAXContainer: "body > *"
            },
            f = {
                init: function(a) {
                    return this.click(function(t) {
                        e(this).galpop("openBox", a), t.preventDefault()
                    })
                },
                openBox: function(t, o, n) {
                    t = e.extend({}, g, t), a.data({
                        controls: t.controls,
                        loop: t.loop,
                        maxWidth: t.maxWidth,
                        maxHeight: t.maxHeight,
                        maxScreen: t.maxScreen,
                        callback: t.callback,
                        contentType: t.contentType
                    });
                    var i = o,
                        l = "",
                        r = this,
                        p = this.data("galpop-container") ? this.data("galpop-container") : t.AJAXContainer;
                    return n || (n = 0), "[object Array]" === Object.prototype.toString.call(o) && (i = (r = o)[n]), o || (i = this.attr("href"), l = this.data("galpop-group"), n = (r = e('[data-galpop-group="' + l + '"]')).index(this), t.arrowKeys && e(document).on("keydown", c), t.updateRsz && e(window).resize(s), t.lockScroll && e("html").addClass("lock-scroll")), a.data({
                        rel: l,
                        group: r,
                        index: n,
                        status: !0,
                        count: r.length,
                        AJAXContainer: p
                    }), a.fadeIn(500, "swing"), this.galpop("preload", i), this
                },
                closeBox: function() {
                    a.removeClass("complete").fadeOut(500, "swing", function() {
                        i.empty(), l.hide().empty(), e(this).data("status", !1), r.hide(), p.hide(), t.removeAttr("style"), a.removeClass("loaded-ajax loaded-image loaded-iframe"), e(document).off("keydown", c), e(window).off("resize", s), e("html").removeClass("lock-scroll")
                    })
                },
                preload: function(e) {
                    switch (a.data("contentType")) {
                        case "AJAX":
                            a.addClass("loaded-ajax"), this.galpop("loadAJAX", e);
                            break;
                        case "iframe":
                            a.addClass("loaded-iframe"), this.galpop("loadIframe", e);
                            break;
                        case "image":
                        default:
                            a.addClass("loaded-image"), this.galpop("loadImage", e)
                    }
                    return this
                },
                loadImage: function(e) {
                    var t = new Image;
                    return t.src = e, u.object = t, u.resizable = !0, t.onload = function() {
                        a.galpop("display")
                    }, t.onerror = function() {
                        console.log(e + " contains a broken image!")
                    }, this
                },
                loadIframe: function(t) {
                    var o = e('<iframe src="' + t + '" />');
                    return u.object = o, u.resizable = !1, a.galpop("display"), this
                },
                loadAJAX: function(t) {
                    var o = a.data("AJAXContainer");
                    return u.resizable = !1, e.ajax({
                        url: t,
                        type: "GET",
                        dataType: "html",
                        success: function(t) {
                            var n = e(t).filter(o),
                                i = e(t).find(o);
                            n.length ? (u.object = n, a.galpop("display")) : i.length ? (u.object = i, a.galpop("display")) : console.log("Element " + o + " not found in DOM.")
                        },
                        error: function(e, a) {
                            0 === e.status ? console.log("Not connect.\n Verify Network.") : 404 == e.status ? console.log("Requested page not found. [404]") : 500 == e.status ? console.log("Internal Server Error [500].") : "parsererror" === a ? console.log("Requested JSON parse failed.") : "timeout" === a ? console.log("Time out error.") : "abort" === a ? console.log("Ajax request aborted.") : console.log("Uncaught Error.\n" + e.responseText)
                        }
                    }), this
                },
                resize: function() {
                    var o = u.resizable,
                        n = u.object.naturalHeight,
                        i = u.object.naturalWidth,
                        l = a.data("maxWidth"),
                        r = a.data("maxHeight"),
                        p = a.data("maxScreen"),
                        d = e(window).height(),
                        c = e(window).width(),
                        s = 0;
                    return (!l || l > c * p / 100) && (l = c * p / 100), (!r || r > d * p / 100) && (r = d * p / 100), o && (i > l && (n *= s = l / i, i *= s), n > r && (i *= s = r / n, n *= s)), t.css({
                        height: n,
                        width: i
                    }), this
                },
                display: function() {
                    this.galpop("resize"), setTimeout(function() {
                        a.addClass("complete"), i.append(u.object).fadeIn(500, "swing", function() {
                            a.galpop("complete")
                        })
                    }, 500)
                },
                complete: function() {
                    var t = a.data("controls"),
                        o = a.data("callback"),
                        n = a.data("index"),
                        i = a.data("count"),
                        l = a.data("loop");
                    a.galpop("infoParse"), !t || 0 === n && !l || i <= 1 ? r.hide() : r.show(), !t || n + 1 >= i && !l || i <= 1 ? p.hide() : p.show(), e.isFunction(o) && o.call(this)
                },
                moveItem: function(t) {
                    var o = a.data("group"),
                        n = !1,
                        r = "";
                    return a.removeClass("complete"), l.fadeOut(500, "swing", function() {
                        e(this).contents().remove()
                    }), i.fadeOut(500, "swing", function() {
                        e(this).empty(), "[object Array]" === Object.prototype.toString.call(o) ? r = o[t] : (n = o.eq(t)).attr("href") ? r = n.attr("href") : n.attr("src") && (r = n.attr("href")), e.fn.galpop("preload", r), a.data("index", t)
                    }), this
                },
                next: function() {
                    var e = a.data("index"),
                        t = a.data("loop");
                    return e + 1 < a.data("count") ? (e++, a.galpop("moveItem", e)) : t && (e = 0, a.galpop("moveItem", e)), this
                },
                prev: function() {
                    var e = a.data("index"),
                        t = a.data("loop"),
                        o = a.data("count");
                    return e > 0 ? (e--, a.galpop("moveItem", e)) : t && (e = o - 1, a.galpop("moveItem", e)), this
                },
                infoParse: function() {
                    var t = a.data("group");
                    if (t instanceof jQuery) {
                        var o = a.data("index"),
                            n = t.eq(o),
                            i = e.trim(n.attr("title")),
                            r = e.trim(n.data("galpop-link")),
                            p = e.trim(n.data("galpop-link-title")),
                            d = e.trim(n.data("galpop-link-target"));
                        l.html(""), i && e("<p>" + i + "</p>").appendTo(l), r && (p || (p = r), d && (d = 'target="' + d + '"'), e('<p><a href="' + r + '" ' + d + ">" + p + "</a></p>").appendTo(l)), (i || r) && l.fadeIn(500, "swing")
                    }
                },
                update: function() {
                    var e = a.data("index");
                    return a.galpop("moveItem", e), this
                },
                destroy: function() {
                    return this.off("click")
                }
            };
        e.fn.galpop = function(a) {
            return f[a] ? f[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void e.error("Method " + a + " does not exist on jQuery.galpop") : f.init.apply(this, arguments)
        }, e.galpop = {}, e.galpop.extend = function(e, a) {
            f[e] = a
        }, e(document).ready(function() {
            a = e('<div id="galpop-wrapper" />').appendTo("body"), t = e('<div id="galpop-container" class="animated fadeIn"/>').appendTo(a), r = e('<a href="#" id="galpop-prev" />').appendTo(t), p = e('<a href="#" id="galpop-next" />').appendTo(t), o = e('<div id="galpop-ajax" />').appendTo(t), n = e('<div id="galpop-modal" />').appendTo(t), i = e('<div id="galpop-content" />').appendTo(n), l = e('<div id="galpop-info" />').appendTo(n), d = e('<a href="#" id="galpop-close" />').appendTo(n), a.click(function(a) {
                e(this).galpop("closeBox"), a.preventDefault()
            }), t.click(function(e) {
                e.stopPropagation()
            }), r.hide().click(function(e) {
                a.galpop("prev"), e.preventDefault()
            }), p.hide().click(function(e) {
                a.galpop("next"), e.preventDefault()
            }), d.click(function(e) {
                a.galpop("closeBox"), e.preventDefault()
            }), l.on("click", "a", function() {
                a.galpop("closeBox")
            }), c = function(e) {
                var t = !1;
                switch (e.which) {
                    case 27:
                        a.galpop("closeBox"), t = !0;
                        break;
                    case 37:
                        a.galpop("prev"), t = !0;
                        break;
                    case 39:
                        a.galpop("next"), t = !0
                }
                t && e.preventDefault()
            }, s = function() {
                a.galpop("resize")
            }
        })
    }(jQuery);