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
			this.sliderIndex = 0;
			
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
					slider.style.display = 'none'
				}
			})
		}
		
		pre(){
			this.nextSliderIndex = this._normalizeIndex(this.sliderIndex - 1, this.slidersLength)
			this.animate()
		}

		next(){
			this.nextSliderIndex = this._normalizeIndex(this.sliderIndex + 1, this.slidersLength)
			this.animate()
		}

		step(){

		}

		animate(){
			const animationDuration = this.animationDuration
			const currentSlider = this.sliders[this.sliderIndex]
			const nextSlider = this.sliders[this.nextSliderIndex]
			util.animate(currentSlider, 'opacity', 1, 0.5, animationDuration / 2, null, () => {
				currentSlider.style.display = 'none'
				util.animate(
					nextSlider, 
					'opacity', 
					0.2, 
					1, 
					animationDuration / 2, 
					() =>{
						nextSlider.style.display = 'block'
					}, 
					() => {
						this.sliderIndex = this.nextSliderIndex
						this.nextSliderIndex += 1
					}
				)
			})
		}

		_normalizeIndex(index, len){
			return (index + len) % len;
		}

	}
	
	window.Swiper = Swiper
})(util)