---
layout:
sitemap:
  exclude: 'yes'
---
$(document).ready(function(){
  $('a.blog-button').click(function (e) {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')){
      var currentWidth = $('body').width()
      $('.panel-cover').animate({'max-width': currentWidth, 'width': '100%'}, 400, swing = 'swing', function () {})
    }else{
      var currentWidth = $('.panel-cover').width()
      if (currentWidth < 960) {
        $('.content-wrapper').addClass('animated slideInRight')
      } else {
        $('.panel-cover').css('max-width', currentWidth)
        $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
      }
    }
    $('.panel-cover').toggleClass('panel-cover--collapsed')

  })

  if (window.location.hash && window.location.hash == '#blog') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })
})




// $(document).ready(function () {
//   $('a.blog-button').click(function (e) {
//     if ($('.panel-cover').hasClass('panel-cover--collapsed')) return
//     currentWidth = $('.panel-cover').width()
//     if (currentWidth < 960) {
//       $('.panel-cover').addClass('panel-cover--collapsed')
//       $('.content-wrapper').addClass('animated slideInRight')
//     } else {
//       $('.panel-cover').css('max-width', currentWidth)
//       $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
//     }
//   })
//
//   if (window.location.hash && window.location.hash == '#blog') {
//     $('.panel-cover').addClass('panel-cover--collapsed')
//   }
//
//   if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
//     $('.panel-cover').addClass('panel-cover--collapsed')
//   }
//
//   $('.btn-mobile-menu').click(function () {
//     $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
//     $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
//   })
//
//   $('.navigation-wrapper .blog-button').click(function () {
//     $('.navigation-wrapper').toggleClass('visible')
//     $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
//   })
//
// })







//
// $(document).ready(function () {
// var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');
//
// var sketch = document.querySelector("#dd");;
// var sketch = document.querySelector("#dd");;
// canvas.width = parseInt(sketch_style.getPropertyValue('width'));
// canvas.height = parseInt(sketch_style.getPropertyValue('height'));
//   var mouse = {x: 0, y: 0};
//     var last_mouse = {x: 0, y: 0};
//
//     /* Mouse Capturing Work */
//     canvas.addEventListener('mousemove', function(e) {
//         last_mouse.x = mouse.x;
//         last_mouse.y = mouse.y;
//
//         mouse.x = e.pageX - this.offsetLeft;
//         mouse.y = e.pageY - this.offsetTop;
//     }, false);
//
//     /* Drawing on Paint App */
//     ctx.lineWidth = 5;
//     ctx.lineJoin = 'round';
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'blue';
//
//     canvas.addEventListener('mousedown', function(e) {
//         canvas.addEventListener('mousemove', onPaint, false);
//     }, false);
//
//     canvas.addEventListener('mouseup', function() {
//         canvas.removeEventListener('mousemove', onPaint, false);
//     }, false);
//
//     var onPaint = function() {
//         ctx.beginPath();
//         ctx.moveTo(last_mouse.x, last_mouse.y);
//         ctx.lineTo(mouse.x, mouse.y);
//         ctx.closePath();
//         ctx.stroke();
//     };
//
//
// });
