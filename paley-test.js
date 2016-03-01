//Andrew's code
function merge(x, y) {
	var merged = [];
	var i = 0;
	var j = 0;
	
	while (i < x.length || j < y.length){
		if (x[i] >= y[j] || j >= y.length) {
			merged.push(x[i]);
			i++;
		} else if (x[i] <= y[j] || i >= x.length){
			merged.push(y[j]);
			j++;
		}
	}
	return merged;
}
//end of Andrew's code

//Adnaan's code
function part1(arr){
	var finalarr = [];
	for(var i = 0; i < Math.floor(arr.length/2) ; i++){
		finalarr.push(arr[i]);
	}
	return finalarr;
}
//end of Adnaan's code