;(function(util){
  class Swiper{
    constructor(selector, opts){
			// Object.assign(this, opts);
			this.container = document.querySelector(selector);
			this.sliderWrap = document.querySelector('.swiper-wrapper');
			this.sliders = Array.from(this.sliderWrap.querySelectorAll('.swiper-slider'));
			this.slidersLength = this.sliders.length;
			this.pagenations = this.container.querySelector(opts.paginations).children;
			this.autoPlay = opts.autoPlay;

			this.pageIndex = 0;
			this.sliderIndex = 1;
			
			this.initEvents()
		}

		initEvents(){
			if(this.autoPlay){
				setTimeout(this.next, this.autoPlay);
			}
		}

		_normalizeIndex(index, len){
			return (index + len) % len;
		}
		
		pre(){
			this.nextSliderIndex = this._normalizeIndex(this.sliderIndex - 1, this.slidersLength)
		}

		next(){
			this.nextSliderIndex = this._normalizeIndex(this.sliderIndex + 1, this.slidersLength)
			this.animate()
		}

		step(){

		}

		animate(){
			const animationDuration = this.animationDuration
			util.animate(this.sliders[this.sliderIndex], 'opacity', 1, 0, animationDuration / 2, () => {
				util.animate(this.sliders[this.nextSliderIndex], 'opacity', 0, 1, animationDuration / 2, () => {
					this.sliderIndex = this.nextSliderIndex
					this.nextSliderIndex += 1
				})
			})
		}

	}
	
	window.Swiper = Swiper
})(util)