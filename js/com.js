var LayerManager = function () {
  var layers = {};

  var add = function (name, container, cover, wrap) {
    // container 弹出层内容 cover 弹出的遮罩层 都直接传class的名称不要带.
    var oJqDomCover = $('.' + cover)
    if (!oJqDomCover.length) {
      oJqDomCover = $('<div class="'+ cover +'"></div>')
      $('body').append(oJqDomCover)
    }
    oJqDomCover.bind('click', function () {
      hide(name)
    })
    layers[name] = {
      container: $('.' + container),
      cover: oJqDomCover,
    }
    wrap && (layers[name].wrap = $('.' + wrap))
  }

  var show = function (name) {
    layers[name].container.fadeIn()
    layers[name].cover.fadeIn()
    if (layers[name].wrap) {
      var nCurScrollTop = document.documentElement.scrollTop
      layers[name].wrap.addClass('temp-wrap').scrollTop(nCurScrollTop)
    }
  }

  var hide = function (name) {
    layers[name].container.fadeOut()
    layers[name].cover.fadeOut()
    if (layers[name].wrap) {
      var nCurScrollTop = layers[name].wrap.scrollTop()
      layers[name].wrap.removeClass('temp-wrap')
      document.documentElement.scrollTop = nCurScrollTop
    }
  }

  return {
    add: add,
    show: show,
    hide: hide,
  }
}