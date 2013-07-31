
(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,lockscroll:true,size:"auto",sizethumb:"auto",invertscroll:false}};a.fn.tinyscrollbar=function(d){var c=a.extend({},a.tiny.scrollbar.options,d);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(q,g){var k=this,t=q,j={obj:a(".viewport",q)},h={obj:a(".overview",q)},d={obj:a(".scrollbar",q)},m={obj:a(".track",d.obj)},p={obj:a(".thumb",d.obj)},l=g.axis==="x",n=l?"left":"top",v=l?"Width":"Height",r=0,y={start:0,now:0},o={},e="ontouchstart" in document.documentElement;function c(){k.update();s();return k}this.update=function(z){j[g.axis]=j.obj[0]["offset"+v];h[g.axis]=h.obj[0]["scroll"+v];h.ratio=j[g.axis]/h[g.axis];d.obj.toggleClass("disable",h.ratio>=1);m[g.axis]=g.size==="auto"?j[g.axis]:g.size;p[g.axis]=Math.min(m[g.axis],Math.max(0,(g.sizethumb==="auto"?(m[g.axis]*h.ratio):g.sizethumb)));d.ratio=g.sizethumb==="auto"?(h[g.axis]/m[g.axis]):(h[g.axis]-j[g.axis])/(m[g.axis]-p[g.axis]);r=(z==="relative"&&h.ratio<=1)?Math.min((h[g.axis]-j[g.axis]),Math.max(0,r)):0;r=(z==="bottom"&&h.ratio<=1)?(h[g.axis]-j[g.axis]):isNaN(parseInt(z,10))?r:parseInt(z,10);w()};function w(){var z=v.toLowerCase();p.obj.css(n,r/d.ratio);h.obj.css(n,-r);o.start=p.obj.offset()[n];d.obj.css(z,m[g.axis]);m.obj.css(z,m[g.axis]);p.obj.css(z,p[g.axis])}function s(){if(!e){p.obj.bind("mousedown",i);m.obj.bind("mouseup",u)}else{j.obj[0].ontouchstart=function(z){if(1===z.touches.length){i(z.touches[0]);z.stopPropagation()}}}if(g.scroll&&window.addEventListener){t[0].addEventListener("DOMMouseScroll",x,false);t[0].addEventListener("mousewheel",x,false);t[0].addEventListener("MozMousePixelScroll",function(z){z.preventDefault()},false)}else{if(g.scroll){t[0].onmousewheel=x}}}function i(A){a("body").addClass("noSelect");var z=parseInt(p.obj.css(n),10);o.start=l?A.pageX:A.pageY;y.start=z=="auto"?0:z;if(!e){a(document).bind("mousemove",u);a(document).bind("mouseup",f);p.obj.bind("mouseup",f)}else{document.ontouchmove=function(B){B.preventDefault();u(B.touches[0])};document.ontouchend=f}}function x(B){if(h.ratio<1){var A=B||window.event,z=A.wheelDelta?A.wheelDelta/120:-A.detail/3;r-=z*g.wheel;r=Math.min((h[g.axis]-j[g.axis]),Math.max(0,r));p.obj.css(n,r/d.ratio);h.obj.css(n,-r);if(g.lockscroll||(r!==(h[g.axis]-j[g.axis])&&r!==0)){A=a.event.fix(A);A.preventDefault()}}}function u(z){if(h.ratio<1){if(g.invertscroll&&e){y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+(o.start-(l?z.pageX:z.pageY)))))}else{y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+((l?z.pageX:z.pageY)-o.start))))}r=y.now*d.ratio;h.obj.css(n,-r);p.obj.css(n,y.now)}}function f(){a("body").removeClass("noSelect");a(document).unbind("mousemove",u);a(document).unbind("mouseup",f);p.obj.unbind("mouseup",f);document.ontouchmove=document.ontouchend=null}return c()}}(jQuery));


function et_listing_make_fluid() {
	var $et_main_map = $( '#googlemap' ),
		new_listing_height;

	if ( $et_main_map.length ) {
		if ( et_window_width < 960 )
			new_listing_height = $('.et-normal-listings #et-listings .overview ul').height();
		else
			new_listing_height = $('.et-normal-listings').height() - 81;

		$('.et-normal-listings #et-listings, .et-normal-listings .viewport').height( new_listing_height );

		$('.et-normal-listings #et-listings').tinyscrollbar_update();
	}
}


$(document).ready(function() {
  et_window_width = $(window).width();
  //Setup scroll bar
  $('.et-place-main-text').tinyscrollbar();
  $('.et-normal-listings #et-listings').tinyscrollbar();
	et_listing_make_fluid();
  
  
  
  $et_list_view = $('#et-list-view.et-normal-listings');
  
  $et_list_view.find('.et-date' ).click( function() {
    $et_list_view = $(this).closest('.et-normal-listings');
  	if ( $et_list_view.hasClass( 'et-listview-open' ) )
      $et_list_view.removeClass( 'et-listview-open' );
  	else
  		$et_list_view.addClass( 'et-listview-open' );    
      return false;
  });
  	
    $('.ui-draggable').draggable();
    
  
});

$(window).resize( function(){
  
	var $et_main_map = $( '#googlemap' ),
	$et_single_map = $( '#et-single-map' );

	et_window_width = $(window).width();

	if ( $et_main_map.length ) {
		//$et_main_map.gmap3("get").panTo( et_active_marker.position );
    
    if ( $('.et-place-main-text').is(':visible  ') ) {
      $('.et-place-main-text:visible').tinyscrollbar_update();
    }
    
		et_listing_make_fluid();
	}

	/*if ( $et_single_map.length ) {
		$et_single_map.gmap3("get").panTo(
			$et_single_map.gmap3({
				get: {
					id : 'et_single_marker'
				}
			}).position
		);
	}*/
} );