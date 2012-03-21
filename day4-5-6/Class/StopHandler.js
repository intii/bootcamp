StopHandler= function(){
	return{
		func: function(arg){
			var title=arg.getTitle();
			console.log(title+" stopped.");
		}
	}	
}();	