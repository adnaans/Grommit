function part1(arr){
	var finalarr = [];
	for(var i = 0; i < Math.floor(arr.length/2) ; i++){
		finalarr.push(arr[i]);
	}
	return finalarr;
}