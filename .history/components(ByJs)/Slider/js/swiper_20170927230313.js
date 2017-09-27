;(function(util){
  class Swiper{
    constructor(selector, opts){
			// Object.assign(this, opts);
			this.container = document.querySelector(selector);
			this.sliderWrap = document.querySelector('.swiper-wrapper');
			this.sliders = Array.from(this.sliderWrap.querySelectorAll('.swiper-slider'));
			this.pagenations = this.container.querySelector(opts.pagenations).children

			this.pageIndex = 0;
			this.sliderIndex = 1;

			this.nav(0);
		}
		
		pre(){

		}

		next(){

		}

		step(){

		}

		animate(){
			util.animate(this.sliders[this.sliderIndex], 'opacity', 1, 0, 500, () => {
				util.animate(this.sliders[this.nextSliderIndex], 'opacity', 0, 1, 500, () => {
					this.sliderIndex = this.nextSliderIndex
					this.nextSliderIndex += 1
				})
			})
		}

	}
	
	window.Swiper = Swiper
})(util)