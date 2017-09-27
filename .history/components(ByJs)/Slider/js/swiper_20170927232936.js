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
			this.animationDuration = opts.animationDuration;

			this.pageIndex = 0;
			this.sliderIndex = 1;
			
			this.initSliders()
			this.initEvents()
		}

		initEvents(){
			this.onAnimationEnd = () => {

			}
			if(this.autoPlay){
				setTimeout(this.next.bind(this), this.autoPlay);
			}
		}

		initSliders(){
			this.sliders.forEach((slider, index) => {
				if(index !== this.sliderIndex){
					slider.style.opacity = 0
				}
			})
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
			util.animate(this.sliders[this.sliderIndex], 'opacity', 1, 0.2, animationDuration / 2, () => {
				util.animate(this.sliders[this.nextSliderIndex], 'opacity', 0, 1, animationDuration / 2, () => {
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