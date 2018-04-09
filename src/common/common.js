const common = {};

// calculation on basis of current time
common.getTime = function(lstUpdateTime, currStockName) {
	
	let str, sec = 0, min = 0, hrs = 0, day = 0;
	//
	sec = lstUpdateTime % 60;
  	min = Math.floor(lstUpdateTime / 60);
  	hrs = Math.floor(min / 60);
  	day = Math.floor(hrs / 24);
	//
	str = (min > 0) ? `${min} min` : (hrs > 0) ? `${hrs} hr ${min} min` : (day > 0) ? `${day} day(s) ago` :  `${sec} sec`;	
  	
  	return str;
}

export default common;