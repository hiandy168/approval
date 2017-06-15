var ZoomImg = (function(window) {
	var ZoomImg = function() {
		return new ZoomImg.fn.init();
	}

	ZoomImg.fn = ZoomImg.prototype = {
		constructor: ZoomImg,
		init: function() {
			this.indexNum = ""; //点击下标
			this.urlList = sessionStorage.getItem("urlList") || []; //图片数组

			this.config = {
				messageInfo: document.querySelector(".messageInfo"),
				swiperWrapper: document.querySelector("#swiperWrapper"),
				backBtn: document.querySelector("#backBtn")
			};

			this.getArguments = function(window) {
				this._getArguments(window);
			};
			this.renderImg = function(){
				this._renderImg();
			};
			this.swiperFn = function(){
				this._swiper();
			};
			this.bindEvent = function(window){
				this._bindEvent(window);
			};
		},
		_getArguments: function(window){ //获取点击下标
			var url = window.location.href;
			var getParam = function(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
				var r = window.location.search.substr(1).match(reg);
				if (r != null) {
					return unescape(r[2]);
				}
				return null;
			};

			if (url.indexOf("index") != -1) {
			    this.indexNum = getParam("index");
			} else {
			    $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			    throw new Error("url错误");
			}; 
		},
		_renderImg: function(){
			var str = "";
			this.urlList = JSON.parse(this.urlList);
			if (this.urlList.length) {
				for (var i = 0,len = this.urlList.length; i < len; i++) {
					str += '<div class="swiper-slide">';
					str += '<div class="swiper-zoom-container">';
					str += '<img data-src='+this.urlList[i]+' class="swiper-lazy">';
					str += '</div>';
					str += '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>';
					str += '</div>';
				}; 
				this.config.swiperWrapper.innerHTML = str;
			} else{
				$(this.config.messageInfo).html("图片为空").fadeIn("fast").delay("1000").fadeOut("slow");
				return;
			};
		},
		_swiper: function(){
			var swiper = new Swiper('.swiper-container', {
				lazyLoading: true,
				// Disable preloading of all images
				preloadImages: false,
				// Enable lazy loading
				zoom: true,
				zoomMax :4,
				pagination: '.swiper-pagination',
				// nextButton: '.swiper-button-next',
				// prevButton: '.swiper-button-prev',
				paginationType : 'fraction'
		    });
		    swiper.slideTo(this.indexNum, 1000, false);
		},
		_bindEvent: function(window){
			this.config.backBtn.addEventListener("touchend", function(event){
				event.stopPropagation();
				event.preventDefault();

				window.history.back();
			}, false);
		}
	}

	ZoomImg.fn.init.prototype = ZoomImg.fn;

	return ZoomImg;
})();

var zoomImg = new ZoomImg();

$(function() {

	zoomImg.getArguments(window); //获取点击下标
	zoomImg.renderImg(); //render img
	zoomImg.swiperFn(); //swiper实例
	zoomImg.bindEvent(window); //返回上一页
	
});