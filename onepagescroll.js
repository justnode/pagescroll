(function($){
	var defaults = {
		'duration': 500,
		'direction': 'horizontal',
		'showpages': true
	}

    var prefix = (function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
               .call(styles)
               .join('') 
               .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
              )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre 
        };
    })(); 

    function has3d(value) {
        var el = document.createElement('p'), 
            has3d;

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        if(el.style[value] != undefined) {
            el.style[value] = 'translate3d(1px, 1px, 1px)';
            has3d = window.getComputedStyle(el).getPropertyValue(value);
        }

        document.body.removeChild(el);

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }    

	function onePagescroll(elem,options){
		this.$doc = $(document)
		this.$win = $(window)
		this.cfg = $.extend({},defaults,options)
		this.$container = $(elem)
		this.$section = this.$container.find('.section')
		this.iIndex = 0
		this.length = this.$section.length;
		this.step = this.cfg.direction == 'horizontal' ? this.$win.width():this.$win.height()
	}
	onePagescroll.prototype = {
		init: function(){
			this.has3d = has3d(prefix['css'] + 'transform') 
			this.$doc.focus()
			if(this.cfg.showpages){
				this.initpages()
			}
			$(document).on('keydown',$.proxy(this.keydown,this))
		},
		keydown: function(e){
			
			if(e.keyCode == 38){
				this.prevMove()
			}
			if(e.keyCode == 40){				
				this.nextMove()
			}
		},
		prevMove: function(){
			if(this.iIndex == 0){
				this.iIndex = this.length - 1;
			}else{
				this.iIndex -= 1
			}
			this._scroll()
		},
		nextMove: function(){

			if(this.iIndex == this.length - 1){
				this.iIndex = 0
			}else{
				this.iIndex += 1
			}
			this._scroll()
		},
		_scroll: function(){
			var length = this.step * (-this.iIndex)
			var duration = this.cfg.duration
			if(this.has3d){
				var translate = this.cfg.direction == 'horizontal' ? lenth + 'px,0px,0px)' : '0px,' + length + 'px,0px)'
				this.$container.css({
					'transition': 'all ' + duration + 'ms ease',
					'-webkit-transform': 'translate3d(' + translate
				})
			}else{
				var obj = this.cfg.direction == 'horizontal' ? {left: length} : {top: length}
				this.$container.animate(obj, this.cfg.duration)
			}
			if(this.cfg.showpages){
				$('#pages li').eq(this.iIndex).addClass('active').siblings().removeClass('active')
			}
		},
		initpages: function(){
			var pageHtml = '<ul id="pages"><li class="active"></li>'
			for(var i=1;i<this.length;i++){
				pageHtml += '<li></li>'
			}
			pageHtml += '</ul>'
			$('body').append(pageHtml)
		}
	}
	$.fn.onepagescroll = function(options){
		return this.each(function(_,elem){
			new onePagescroll(elem,options).init()
		})
	}
})(jQuery)