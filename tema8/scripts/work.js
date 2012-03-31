//this.onmessage= function(){
	var counter=1;
	setInterval(function(){
		var msg="Worker doing job#"+counter;
		self.postMessage(msg);
		++counter;
	},10000);
//}