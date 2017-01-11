var util = (function(){
	return {
		html2node: function(template){
			var container = document.createElement('div');
			container.innerHTML = template;
			return container.children[0];
		},
	
		extend: function(o1, o2){
			for(var i in o2){
				if(o1[i] === undefined){
					o1[i] = o2[i];
				}
			}
		}		
	}
})();