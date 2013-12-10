var DDSPEED = 10;  //6
var DDTIMER = 10;  //3
var OFFSET = -2;
var ZINT = 100;
// main function to handle the mouse events //
function ddMenu(id,d){
	var h = document.getElementById(id + '-base');
	var c = document.getElementById(id + '-content');
	clearInterval(c.timer);
	if(d == 1){
		clearTimeout(h.timer);
		c.style.display = 'block';
		if(c.maxh && c.maxh <= c.offsetHeight){return;} 
		else if(!c.maxh){
			c.style.left = (h.offsetWidth + OFFSET) + 'px';
			c.style.height = 'auto';
			c.maxh = c.offsetHeight;
			c.style.height = '0px';
		}
		ZINT = ZINT + 1;
		c.style.zIndex = ZINT;
		c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
	}else{
		h.timer = setTimeout(function(){ddCollapse(c)},100);
	}
}
// collapse the menu //
function ddCollapse(c){
	c.timer = setInterval(function(){ddSlide(c,-1)},DDTIMER);
}
// cancel the collapse if a user rolls over the dropdown //
function cancelHide(id){
	var h = document.getElementById(id + '-base');
	var c = document.getElementById(id + '-content');
	clearTimeout(h.timer);
	clearInterval(c.timer);
	if(c.offsetHeight < c.maxh){
		c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
	}
}
// incrementally expand/contract the dropdown and change the opacity //
function ddSlide(c,d){
	var currh = c.offsetHeight;
	var dist;
	if(d == 1){
		dist = Math.round((c.maxh - currh) / DDSPEED);
	}else{
		dist = Math.round(currh / DDSPEED);
	}
	if(dist <= 1 && d == 1){
		dist = 1;
	}
	c.style.height = currh + (dist * d) + 'px';
	c.style.opacity = currh / c.maxh;
	c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
	if(currh > (c.maxh - 2) && d == 1){
		clearInterval(c.timer);
	}else if(dist < 1 && d != 1){
		clearInterval(c.timer);
		c.style.display = 'none';
	}
}