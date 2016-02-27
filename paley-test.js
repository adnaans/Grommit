//Andrew's code
function merge(x, y) {
	var merged = [];
	var i = 0;
	var j = 0;
	
	while (i < x.length || j < y.length){
		if (x[i] > y[j]) {
			merged.push(x[i]);
			if (i < x.length) {
				i++;
			}
		} else {
			merged.push(y[j]);
			if (j < y.length){
				j++;
			}
		}
	}
	return merged;
}

// var x = [10, 10, 8, 7, 6, 5, 5, 4, 3, 2];
// var y = [11, 9, 9, 8, 7, 7, 6, 5, 3, 3, 3, 2, 1, 1];
// var c = merge(x, y);
// var s = "";
// 
// for (var i = 0; i < c.length; i++){
// 	s = s + c[i] + " ";
// }
// 
// alert(s);
//end of Andrew's code