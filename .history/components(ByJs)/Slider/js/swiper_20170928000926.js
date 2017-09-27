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
			this.play()
		}

		beforePlay(){
			this.beforeDate = new Date
		}

		endPlay(){
			this.endDate = new Date
			console.log('diff time', this.endDate - this.beforeDate)
		}

		play(){
			if(this.autoPlay){
				this.beforePlay()
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
			currentSlider.style.display = 'none'
			util.animate(
				nextSlider, 
				'opacity', 
				0.8, 
				1, 
				animationDuration, 
				() =>{
					nextSlider.style.display = 'block'
				}, 
				() => {
					this.sliderIndex = this.nextSliderIndex
					this.nextSliderIndex += 1
					if(this.autoPlay){
						this.play()
					}
				}
			)
		}

		_normalizeIndex(index, len){
			return (index + len) % len;
		}

	}
	
	window.Swiper = Swiper
})(util)