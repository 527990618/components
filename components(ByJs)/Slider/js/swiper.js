;(function(util){
  // paginations: paginations的选择器
  // autoPlay: 自动播放的间隔
  // animationDuration: 动画播放的时间
  // paginationActive: 活跃pagination的类
  class Swiper{
    constructor(selector, opts){
			this.opts = Object.assign({}, opts);
			this.container = document.querySelector(selector);
			this.sliderWrap = document.querySelector('.swiper-wrapper');
			this.sliders = Array.from(this.sliderWrap.querySelectorAll('.swiper-slider'));
			this.slidersLength = this.sliders.length;
			this.paginationsWrap = this.container.querySelector(opts.paginations);
      this.paginations = Array.from(this.paginationsWrap.children);

			this.autoPlay = opts.autoPlay;
			this.animationDuration = opts.animationDuration;

			this.pageIndex = 0;
			this.sliderIndex = 0;

      this.isCanStep = true;

			this.initSliders()
			this.initEvents()
		}

		initEvents(){
      this.sliderWrap.addEventListener('mouseenter', () => {
        console.log('mouseenter')
        this.stopAutoPlay()
      })
      this.sliderWrap.addEventListener('mouseleave', () => {
        console.log('mouseleave')
        this.autoPlay = this.opts.autoPlay
        this.play()
      })
      this.paginations.forEach( (pagination, index) => {
        pagination.addEventListener('click', () => {
          console.log('点击pagination', index)
          this.stopAutoPlay()
          this.step(index)
        })
      })
      util.emitter.on('sliderIndexChange', (sliderIndex) => {
        // const sliderIndex = this.sliderIndex
        this.paginations.forEach( (pagination, index) => {
          // TODO: IE9不支持这种写法
          if(sliderIndex !== index){
            pagination.classList.remove(this.opts.paginationActive)
          } else {
            pagination.classList.add(this.opts.paginationActive)
          }
        })
      })
      util.emitter.emit('sliderIndexChange', this.sliderIndex)
			this.play()
		}

    stopAutoPlay(){
      clearTimeout(this.playID)
      this.autoPlay = 0
    }

		beforePlay(){
			this.beforeDate = new Date
		}

		endPlay(){
			this.endDate = new Date
			console.log('diff time', this.endDate - this.beforeDate)
		}

		play(){
      this.beforePlay()
			if(this.autoPlay){
				this.playID = setTimeout(this.next.bind(this), this.autoPlay);
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
			const stepIndex = this.sliderIndex - 1
			this.step(stepIndex)
		}

		next(){
			const stepIndex = this.sliderIndex + 1
      this.step(stepIndex)
		}

		step(index){
      const nextSliderIndex = this._normalizeIndex(index, this.slidersLength)
      if(!this.isCanStep || this.sliderIndex === nextSliderIndex) return
      this.nextSliderIndex = nextSliderIndex
      console.log('current step', this.sliderIndex)
      console.log('next step', nextSliderIndex)
      this.animate()
		}

		animate(){
      if(this.sliderIndex === null || this.nextSliderIndex === null) return
			const animationDuration = this.animationDuration
			const currentSlider = this.sliders[this.sliderIndex]
			const nextSlider = this.sliders[this.nextSliderIndex]
      this.isCanStep = false
			currentSlider.style.display = 'none'
      util.emitter.emit('sliderIndexChange', this.nextSliderIndex)
			util.animate(
				nextSlider,
				'opacity',
				0.8,
				1,
				animationDuration,
				() => {
					nextSlider.style.display = 'block'
				},
				() => {
          this.isCanStep = true
					this.sliderIndex = this.nextSliderIndex
					this.nextSliderIndex = null
					if(this.autoPlay){
						this.endPlay()
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
