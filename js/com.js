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

  var setOpened = function (name) {
    opened = name
  }

  return {
    add: add,
    show: show,
    hide: hide,
    setOpened: setOpened
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

/**
 * 报表图表
 *
 * init 初始化方法
 *
 * data 数据结构
 *
 * [{ title: '场次', value: 15, unit: '场' }, {title: '时长', value: 3, unit: '小时'}, {title: '人数', value: 56, unit: '个'}]
 */
var Chart = function (config) {
  var max = 60, yAxisHtml, xAxisHtml, gridHtml;

  var checkMax = function () {
    for (var i = 0, len = config.data.length; i < len; i++) {
      if (config.data[i].value > max) {
        max = config.data[i].value
      }
    }
  }

  var renderY = function () {
    yAxisHtml = '<div class="y-axis">';
    for (var i = 0, len = config.data.length; i < len; i++) {
      yAxisHtml += '<div><span class="name">'+ config.data[i].title +'</span><span class="unit">('+ config.data[i].unit +')</span></div>';
    }
    yAxisHtml += '</div>';
  }

  var renderX = function () {
    var xUnit = Math.ceil(max / 12)
    xAxisHtml = '<div class="x-axis">'
    for (var i = 1; i < 4; i++) {
      xAxisHtml += '<div>'+ (xUnit * i * 3) +'</div>'
    }
    xAxisHtml += '</div>'
  }

  var renderChart = function () {
    gridHtml = '<div class="chart"><div class="grids">';
    for (var i = 0; i < 12; i++) {
      gridHtml += '<div></div>';
    }
    gridHtml += '</div><div class="bars">'
    for (var i = 0, len = config.data.length; i < len; i++) {
      gridHtml += '<div class="'+ config.classes[i] +'" style="width: '+ (config.data[i].value / max) * 100 +'%"></div>';
    }
    gridHtml += '</div></div>';
  }

  var init = function () {
    checkMax()
    renderX()
    renderY()
    renderChart()
    $(config.elm).html(xAxisHtml + yAxisHtml + gridHtml)
  }

  return {
    init: init
  }
}

document.body.addEventListener('scroll', function () {
  console.log(document.documentElement.scrollTop)
})

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || setTimeout(function () {}, 60)

var startY = 0

$('.main-content').bind('touchstart', function (e) {
  var ev = e.originalEvent.changedTouches[0]
  startY = ev.clientY
})

var clientHeight = $('.main-content').height(),
scrollHeight = $('.main-content').prop('scrollHeight');

$('.main-content').bind('touchmove', function (e) {
  var ev = e.originalEvent.changedTouches[0], $this = $(this)
  if ($this.scrollTop() <= 0 && ev.clientY - startY > 0) {
    e.preventDefault()
  } else if ($this.scrollTop() + clientHeight >= scrollHeight && ev.clientY - startY < 0) {
    e.preventDefault()
  }
})





