var LayerManager = function () {
  var layers = {}

  var add = function (name, container, cover) {
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
    console.log(layers)
  }

  var show = function (name) {
    layers[name].container.fadeIn()
    layers[name].cover.fadeIn()
  }

  var hide = function (name) {
    layers[name].container.fadeOut()
    layers[name].cover.fadeOut()
  }

  return {
    add: add,
    show: show,
    hide: hide,
  }
}