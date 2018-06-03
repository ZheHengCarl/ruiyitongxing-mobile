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
var _winHeight = window.innerHeight;
let _header = $(".pop-head .header").height();
let _headList = $(".pop-head .head-list").css("margin-top");
if (_headList) {
  _headList = +_headList.substr(0,_headList.length-2);
}
$(".pop-head .head-list").height(_winHeight - _header -_headList - 20);
$(".pop-head .header input").keyup(function(){
    let _inputValue = $(this).val();
    $(".pop-head .head-list li").each(function(item,value){
        if ($(this).text().indexOf(_inputValue) > -1) {
          $(this).show();
        }
        else{
          $(this).hide();
        }
    });
});
$(".pop-head .head-list").on("click","li", function(){
    let _actText = $(this).text();
    $(".head-content").text(_actText);
    $(this).parent().parent().hide();
});
$(".head-content").click(function(){
    $(".pop-head").show();
});
$(".pop-head .head-back").click(function(){
  $(this).parent().parent().hide();
});