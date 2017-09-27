;(function(){
  class Swiper{
    constructor(selector, opts){
			Object.assign(this, opts);
			this.container = document.querySelector(selector);
			this.sliderWrap = document.querySelector('.swiper-wrapper');
			this.sliders = Array.from(this.sliderWrap.querySelectorAll('.swiper-slider'));
			this.pages = this.imgs || [];

			this.animationDuration = this.animationDuration || 5000;
			this.animationend = true;

			this.pageIndex = 0;
			this.offsetAll = 0;
			this.sliderIndex = 1;

			

			this.init();
			this.nav(0);
    }
  }
})()