;(function(){
  class Swiper{
    constructor(opts){
      Object.assign(this, opts);
			this.container = this.container || document.body;
			this.pages = this.imgs || [];

			this.animationDuration = this.animationDuration || 5000;
			this.animationend = true;

			this.pageIndex = 0;
			this.offsetAll = 0;
			this.sliderIndex = 1;

			this.sliders = Array.from(this.sliderWrap.querySelectorAll('.slider'));

			this.init();
			this.nav(0);
    }
  }
})()