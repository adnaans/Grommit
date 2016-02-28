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

//vinay

// var x = [10, 10, 8, 7, 6, 5, 5, 4, 3, 2, 2, 2, 2, 1, 1];
// var y = [23];
// var c = merge(x, y);
// var s = "";
// 
// for (var i = 0; i < c.length; i++){
// 	s = s + c[i] + " ";
// }
// 
// alert(s);
//end of Andrew's code