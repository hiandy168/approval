/*
 * @Author: Administrator
 * @Date:   2017-05-17 16:01:38
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-06 18:16:04
 */

'use strict';
var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 750) {
	deviceWidth = 750;
} else if (deviceWidth < 320) {
	deviceWidth = 320;
};
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
// (function(doc, win) {
// 	var docEl = doc.documentElement,
// 		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
// 		recalc = function() {
// 			var clientWidth = docEl.clientWidth;
// 			if (clientWidth >= 750) {
// 				clientWidth = 750;
// 			} else if (clientWidth < 320) {
// 				clientWidth = 320;
// 			};
// 			if (!clientWidth) return;
// 			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
// 		};
// 	if (!doc.addEventListener) return;
// 	win.addEventListener(resizeEvt, recalc, false);
// 	doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);