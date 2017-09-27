;(function(util){
  class Swiper{
    constructor(selector, opts){
			// Object.assign(this, opts);
			this.container = document.querySelector(selector);
			this.sliderWrap = document.querySelector('.swiper-wrapper');
			this.sliders = Array.from(this.sliderWrap.querySelectorAll('.swiper-slider'));
			this.slidersLength = this.sliders.length;
			this.pagenations = this.container.querySelector(opts.pagenations).children;

			this.pageIndex = 0;
			this.sliderIndex = 1;

			this.nav(0);
		}
		
		pre(){
			this.nextSliderIndex = this._normalizeIndex(this.sliderIndex - 1, this.slidersLength)
		}

		next(){
			this.nextSliderIndex = this._normalizeIndex(this.sliderIndex + 1, this.slidersLength)
		}

		step(){

		}

		animate(){
			const animationDuration = this.animationDuration
			util.animate(this.sliders[this.sliderIndex], 'opacity', 1, 0, animationDuration, () => {
				util.animate(this.sliders[this.nextSliderIndex], 'opacity', 0, 1, animationDuration, () => {
					this.sliderIndex = this.nextSliderIndex
					this.nextSliderIndex += 1
				})
			})
		}

		_normalizeIndex(index, len){
			return (index + len) % len;
		}

	}
	
	window.Swiper = Swiper
})(util)