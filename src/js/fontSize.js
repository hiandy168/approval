/*
* @Author: Administrator
* @Date:   2017-05-17 16:01:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-17 16:01:57
*/

'use strict';
var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 750) {
	deviceWidth = 750;
} else if (deviceWidth < 320) {
	deviceWidth = 320;
};
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';