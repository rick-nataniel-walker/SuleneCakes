const swiper = new Swiper('.swiper-container', {
    init:true,
    autoplay: {
        delay: 5000,
      },


      containerModifierClass:'swiper-wrapper',
      slideClass:'swiper-slide',
      wrapperClass:'swiper-wrapper',
      speed: 1000,


});
const swiper2 = new Swiper('.swiper', {
    init:true,
  
    autoplay: {
      delay: 7000,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    
    speed: 2500,


});

$('.collapse-1').collapsable({
  // options here
});