var layer = LayerManager()
layer.add('sideNav', 'side-nav', 'layer-cover-black')
$('.btn-open-side-nav').bind('click', function () {
  layer.show('sideNav')
})