function MovieDownloader(){
	var instantiated;

	function init(){

		return{
			down: function(mov){
				console.log("Downloading "+mov.getTitle()+"...");
			}
		}	
	}

	this.getInstance= function(){
		if( !instantiated ){
			instantiated= init();
		}
		return instantiated;
	}
}