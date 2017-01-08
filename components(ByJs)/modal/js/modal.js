const template = 
	'<div class="m-modal-cotain">\
		<div class="m-modal j-modal">\
			<div class="tit j-tit"></div>\
			<div class="content j-content"></div>\
			<div class="btn-area">\
				<button class="u-btn j-close">关闭</button>\
			</div>\
		</div>\
	</div>';

function html2Node(string){
	var container = document.createElement('div');
	container.innerHTML = string;
	return container.children[0];
}

function extend(o1, o2){
	for(var i in o2){
		if(!o1[i]){
			o1[i] = o2[i];
		}
	}
}


function animateClass(node, className, callback){

	function onAnimationend(){

		node.classList.remove(className);
		node.removeEventListener('animationend', onAnimationend);
		callback && callback();

	}

	node.addEventListener('animationend', onAnimationend);

	if(className && !node.classList.contains(className)){
		node.classList.add(className);
	}
	
}



class Modal{

	constructor(options){

		options = options || {};
		extend(this, options);

		this._init();
	}

	_init(){
		const node = html2Node(template);
		this.container = node.cloneNode(true);
		this.elm = this.container.querySelector('.j-modal');
		this.titElm = this.container.querySelector('.j-tit');
		this.contentElm = this.container.querySelector('.j-content');
		this.titElm.textContent = this.title;
		this._setContent(this.content);
		this._initEvent();
	}

	_initEvent(){
		let closeBtns = this.elm.querySelectorAll('.j-close');
		closeBtns.forEach( item => item.addEventListener('click', this.close.bind(this)));
	}

	_setContent(content){
		if(content.nodeType === 1){
			this.contentElm.innerHTML = '';
			this.contentElm.appendChild(content);
		} else {
			this.contentElm.innerHTML = content;
		}
	}

	open(){
		//加入节点  加入class类  动画完成移除类（便于添加其他动画）	
		document.body.appendChild(this.container);
		animateClass(this.elm, this.animation.enter);
	}	

	close(){
		//加入class类  动画完成移除类  移除节点
		animateClass(this.elm, this.animation.leave, () => 
			document.body.removeChild(this.container)	
		);
		

	}
}