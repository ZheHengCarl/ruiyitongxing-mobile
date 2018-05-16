var LayerManager = function () {
  var layers = {}, opened = null

  var add = function (name, container, cover, wrap) {
    // container 弹出层内容 cover 弹出的遮罩层 都直接传class的名称不要带.
    var oJqDomCover = $('.' + cover)
    if (!oJqDomCover.length) {
      oJqDomCover = $('<div class="'+ cover +'"></div>')
      $('body').append(oJqDomCover)
    }
    oJqDomCover.bind('click', function () {
      if (opened) {
        hide(opened)
        opened = null
      }
    })
    layers[name] = {
      container: $('.' + container),
      cover: oJqDomCover,
    }
    wrap && (layers[name].wrap = $('.' + wrap))
  }

  var show = function (name) {
    opened = name
    layers[name].container.fadeIn()
    layers[name].cover.fadeIn()
    if (layers[name].wrap) {
      var nCurScrollTop = document.documentElement.scrollTop
      layers[name].wrap.addClass('temp-wrap').scrollTop(nCurScrollTop)
    }
  }

  var hide = function (name) {
    layers[name].container.fadeOut()
    layers[name].cover.fadeOut(function () {
      if (layers[name].wrap) {
        var nCurScrollTop = layers[name].wrap.scrollTop()
        layers[name].wrap.removeClass('temp-wrap')
        document.documentElement.scrollTop = nCurScrollTop
      }
    })
  }

  return {
    add: add,
    show: show,
    hide: hide,
  }
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

