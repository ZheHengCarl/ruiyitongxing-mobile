var layer = LayerManager()
layer.add('sideNav', 'side-nav', 'layer-cover-black')
$('.btn-open-side-nav').bind('click', function () {
  layer.show('sideNav')
})

layer.add('multiSelect', 'multi-select', 'layer-cover')
$('.multi-select-bar .select-value').bind('click', function () {
  var $thisParent = $(this).parents('.multi-select-bar')
  $thisParent.find('.multi-select').fadeIn()
  $('.layer-cover').fadeIn()
  layer.setOpened('multiSelect')
})
$('.multi-select-bar .option input').bind('change', function () {
  var $thisParent = $(this).parents('.multi-select-bar')
  var selectedOptions = []
  $thisParent.find('input:checked').each(function () {
    var $this = $(this)
    selectedOptions.push($this.parents('.option').find('span').text())
  })
  $thisParent.find('.select-value').text(selectedOptions.length > 0 ? selectedOptions.join(',') : '请选择')
})